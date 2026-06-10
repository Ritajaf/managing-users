'use client';
import { motion } from "framer-motion";
import BasePage from "./BasePage";
import { useState } from "react";
import CustomAlert from "./CustomAlert";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

type AlertState = {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alert, setAlert] = useState<AlertState | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setAlert({ severity: 'error', message: 'Passwords do not match.' });
      return;
    }

    try {
      await registerUser({ email, password, firstName, lastName });
      setAlert({ severity: 'success', message: 'Successfully registered!' });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setTimeout(() => router.push('/start/Login'), 1500);
    } catch (error: any) {
      setAlert({
        severity: 'error',
        message: error.message || 'Registration failed. Please try again.',
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
          <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-muted-foreground text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        {alert && (
          <CustomAlert severity={alert.severity} message={alert.message} />
        )}

        <BasePage
          title="Register"
          buttonText="Sign Up"
          fields={[
            { placeholder: "First Name", value: firstName, onChange: (e) => setFirstName(e.target.value) },
            { placeholder: "Last Name", value: lastName, onChange: (e) => setLastName(e.target.value) },
            { placeholder: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
            { placeholder: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value) },
            { placeholder: "Confirm Password", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) },
          ]}
          showRememberMe={false}
          onSubmit={handleRegister}
        />
      </motion.div>
    </div>
  );
}
