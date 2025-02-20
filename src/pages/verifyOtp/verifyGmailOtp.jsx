import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      var email = localStorage.getItem("email");

      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok || data.output) {
        toast.success("Verified OTP successfully! Redirecting...");
        setTimeout(() => navigate("/reset-password"), 2000);
      } else {
        setMessage(data.error || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("Failed to verify OTP. " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md text-center transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Verify OTP
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Enter the OTP sent to your email.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center text-lg"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>

        {message && (
          <p className="mt-4 text-red-500 text-sm font-semibold">{message}</p>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default VerifyOtp;
