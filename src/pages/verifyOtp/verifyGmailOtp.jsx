import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const verifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      var email = localStorage.getItem("email")

      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email,otp }),
      });


      const data = await response.json();
      if (response.ok || data.output) {
        toast.success("Verified OTP successfully ! ... redirecting to reset password")
        setTimeout(() => navigate('/reset-password'), 2000);
      } else {
        setMessage(data.error || 'Invalid OTP.');
      }
    } catch (error) {
      setMessage('Failed to verify OTP.'+error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Verify OTP</h1>
      <input
        type="text"
        placeholder="Enter OTP"
        className="input input-bordered w-full max-w-md"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="btn mt-4" onClick={handleVerifyOtp}>
        Verify OTP
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
      
      <Toaster/>
    </div>
  );
};

export default verifyOtp;
