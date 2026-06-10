'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProfile } from '@/services/authService';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { createAddress, getMyAddresses, deleteAddress } from '@/services/addressesService';

type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

type Address = {
  id: number;
  street: string;
  city: string;
  country: string;
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [street, setStreet] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/start/Login');
      return;
    }

    Promise.all([getProfile(token), getMyAddresses(token)])
      .then(([profileData, addressData]) => {
        setUser(profileData.user);
        setAddresses(addressData);
      })
      .catch(() => {
        localStorage.removeItem('access_token');
        router.push('/start/Login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleAddAddress = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/start/Login');
      return;
    }
    setAddressError('');
    try {
      await createAddress({ street, city, country }, token);
      setStreet('');
      setCity('');
      setCountry('');
      setShowAddressForm(false);
      const updatedAddresses = await getMyAddresses(token);
      setAddresses(updatedAddresses);
    } catch (err: any) {
      setAddressError(err.message || 'Failed to add address');
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
      await deleteAddress(id, token);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setAddressError(err.message || 'Failed to delete address');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/start/Login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 space-y-6 shadow-xl w-full max-w-md"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Your account information</p>
        </div>

        {user && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{user.firstName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{user.lastName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        )}
{addresses.length > 0 && (
  <div className="space-y-2">
    <p className="text-sm font-semibold text-gray-600">My Addresses</p>
    {addresses.map((address) => (
      <div key={address.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
        <span className="text-sm">{address.street}, {address.city}, {address.country}</span>
        <button
          onClick={() => handleDeleteAddress(address.id)}
          className="text-red-500 text-xs hover:text-red-700 ml-2"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}

{addressError && (
  <p className="text-red-500 text-sm">{addressError}</p>
)}

<Button
  variant="contained"
  color="primary"
  onClick={() => setShowAddressForm(!showAddressForm)}
>
  {showAddressForm ? 'Cancel' : 'Add Address'}
</Button>
{showAddressForm && (
  <div className="space-y-4 mt-4">
    <Input
      placeholder="Street"
      fullWidth
      value={street}
      onChange={(e) => setStreet(e.target.value)}
    />

    <Input
      placeholder="City"
      fullWidth
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />

    <Input
      placeholder="Country"
      fullWidth
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    />

    <Button variant="contained" color="success" onClick={handleAddAddress}>
      Save Address
    </Button>
  </div>
  
)}
    <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
