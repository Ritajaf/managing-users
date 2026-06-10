'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BasePage from './BasePage';
import CustomAlert from './CustomAlert';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/authService';

type AlertState = {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertState | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({ severity: 'error', message: 'Please enter your email and password.' });
      return;
    }

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('access_token', data.token);
      setAlert({ severity: 'success', message: 'Successfully logged in!' });
      setEmail('');
      setPassword('');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (error: any) {
      setAlert({
        severity: 'error',
        message: error.message || 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 space-y-8 shadow-xl w-full max-w-md"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        {alert && (
          <CustomAlert severity={alert.severity} message={alert.message} />
        )}

        <BasePage
          title="Login"
          buttonText="Sign In"
          fields={[
            { placeholder: 'Email', type: 'email', value: email, onChange: (e) => setEmail(e.target.value) },
            { placeholder: 'Password', type: 'password', value: password, onChange: (e) => setPassword(e.target.value) },
          ]}
          showRememberMe={false}
          onSubmit={handleLogin}
        />
      </motion.div>
    </div>
  );
}
