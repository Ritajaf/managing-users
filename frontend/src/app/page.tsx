'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail } from 'lucide-react';
import BasePage from '@/components/ui/BasePage';
import LoginPage from '@/components/ui/LoginPage';
import RegisterPage from '@/components/ui/RegisterPage';
import Start from '@/components/ui/Start';
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
   <Start/>  );
}