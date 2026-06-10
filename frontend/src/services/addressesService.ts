const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type CreateAddressData = {
  street: string;
  city: string;
  country: string;
};

export async function createAddress(data: CreateAddressData, token: string) {
  const response = await fetch(`${API_URL}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add address');
  }

  return response.json();
}

export async function getMyAddresses(token: string) {
  const response = await fetch(`${API_URL}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }

  return response.json();
}

export async function deleteAddress(id: number, token: string){
    const response = await fetch(`${API_URL}/addresses/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete address');
    }

    return response.json();
}