import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use the hook

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok || data.output) {
        toast.success("OTP sent Successfully Check your Mail")
        localStorage.setItem('email', email);

        // Use navigate to go to the verify-otp page
        setTimeout(() => {
          navigate('/verify-otp');
        }, 1000); // Delay for a better UX
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      
      setMessage('Failed to send password reset link.');
    }
  };

  return (
    <div className="flex flex-col gap-[10px] items-center">
      <h1 className="text-2xl font-semibold">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="input input-bordered w-full max-w-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-neutral mt-4" onClick={handleForgotPassword}>
        Send Reset Link
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}

      <Link
      to="/login"
      className="text-xl btn w-36 btn-outline text-center mb-[5px] justify-center items-center btn-primary mt-2  flex"
      >
        Login
      </Link>

      <Toaster/>
    </div>
  );
};

export default ForgotPassword;
