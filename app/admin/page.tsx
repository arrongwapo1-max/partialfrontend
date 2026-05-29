'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 👈 1. IMPORT THE NEXT.JS ROUTER

export default function AdminAuthPage() {
  const router = useRouter(); // 👈 2. INITIALIZE THE ROUTER
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Password validation for registration
    if (
      activeTab === 'register' &&
      formData.password !== formData.confirmPassword
    ) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      // FIXED: Perfectly matching Laravel Route::prefix('auth') group setup
      const endpoint =
        activeTab === 'signin'
          ? 'http://localhost:8000/api/auth/signin'
          : 'http://localhost:8000/api/auth/register';

      // Request Payload
      const payload: any = {
        email: formData.email,
        password: formData.password,
      };

      // Include confirmation payload for registration
      if (activeTab === 'register') {
        payload.password_confirmation = formData.confirmPassword;
      }

      // Send request out to backend server
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Handle errors returned by server
      if (!response.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          throw new Error(
            Array.isArray(firstError) ? firstError[0] : 'Validation failed'
          );
        }
        throw new Error(data.message || 'Something went wrong');
      }

      // Save token on login success
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Display successful outcome
      setMessage({
        type: 'success',
        text:
          activeTab === 'signin'
            ? 'Login successful! Redirecting...'
            : 'Registration successful!',
      });

      // 👈 3. REDIRECT TO DASHBOARD ON SUCCESSFUL SIGN IN
      if (activeTab === 'signin') {
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000); // 1-second delay so the user can read the success message
      }

      // Clear input fields safely
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
      });

      console.log('Laravel Response:', data);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message,
      });
      console.error(error);
    }
  };

  if (!mounted) {
    return <div className="flex min-h-screen items-center justify-center bg-[#faf6f6]" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf6f6] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-xl border border-gray-100">
        {/* Tabs */}
        <div className="flex bg-gray-50 text-gray-400 font-medium border-b border-gray-100">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setMessage({ type: '', text: '' });
              setShowPassword(false);
            }}
            className={`flex w-1/2 items-center justify-center gap-2 py-5 text-lg transition-all duration-200 ${
              activeTab === 'signin'
                ? 'bg-white text-[#5c1d1d] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                : 'bg-gray-50 hover:text-gray-600'
            }`}
          >
            <span>➔</span> Sign in
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setMessage({ type: '', text: '' });
              setShowPassword(false);
              setShowConfirmPassword(false);
            }}
            className={`flex w-1/2 items-center justify-center gap-2 py-5 text-lg transition-all duration-200 ${
              activeTab === 'register'
                ? 'bg-white text-[#5c1d1d] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                : 'bg-gray-50 hover:text-gray-600'
            }`}
          >
            <span>+👤</span> Register
          </button>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-10 pt-8 flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#5c1d1d]">
              Jollyanne's Crispy Lechon
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Management & Administration Portal
            </p>
          </div>

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#faf6f6]">
            <svg
              className="h-11 w-11 text-[#5c1d1d]/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {message.text && (
            <div
              className={`mb-4 w-full text-center text-sm p-2.5 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative border-b border-gray-200 py-2 focus-within:border-[#5c1d1d] transition">
                <span className="absolute left-0 top-3 text-gray-400">👤</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Username or e-mail"
                  className="w-full pl-7 pr-2 text-gray-700 placeholder-gray-300 outline-none bg-transparent text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative border-b border-gray-200 py-2 focus-within:border-[#5c1d1d] transition">
                <span className="absolute left-0 top-3 text-gray-400">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-7 pr-10 text-gray-700 placeholder-gray-300 outline-none bg-transparent text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2.5 text-gray-400 hover:text-[#5c1d1d]"
                >
                  👁️
                </button>
              </div>

              {/* Confirm Password */}
              {activeTab === 'register' && (
                <div className="relative border-b border-gray-200 py-2 focus-within:border-[#5c1d1d] transition">
                  <span className="absolute left-0 top-3 text-gray-400">🔒</span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full pl-7 pr-10 text-gray-700 placeholder-gray-300 outline-none bg-transparent text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-2.5 text-gray-400 hover:text-[#5c1d1d]"
                  >
                    👁️
                  </button>
                </div>
              )}
            </div>

            {/* Remember me */}
            {activeTab === 'signin' && (
              <div className="flex items-center justify-between text-xs text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  Remember me
                </label>
                <a href="#" className="hover:text-[#5c1d1d]">
                  I forgot password
                </a>
              </div>
            )}

            {/* Form Actions */}
            <div className="pt-2 flex flex-col items-center space-y-4">
              <button
                type="submit"
                className="w-full rounded-full bg-[#5c1d1d] py-3 text-center font-medium text-white transition hover:bg-[#4a1717]"
              >
                {activeTab === 'signin' ? 'Sign In' : 'Order Access Registration'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab(activeTab === 'signin' ? 'register' : 'signin');
                  setMessage({ type: '', text: '' });
                }}
                className="text-xs text-gray-400 font-medium hover:text-[#5c1d1d]"
              >
                {activeTab === 'signin'
                  ? 'Create admin account'
                  : 'Already registered? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 