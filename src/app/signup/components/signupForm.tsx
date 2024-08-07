'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { signupAction } from '@/actions/auth'; // Replace with actual signup action

function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);

      const { errorMessage } = await signupAction(formDataToSend);
      if (!errorMessage) {
        router.replace('/');
      } else {
        setErrorMessage(errorMessage);
      }
    });
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="p-2 rounded-lg"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isPending}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="p-2 rounded-lg"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={isPending}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="p-2 rounded-lg"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={isPending}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 bg-slate-400 py-2 rounded-lg"
      >
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>

      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
    </form>
  );
}

export default SignupForm;
