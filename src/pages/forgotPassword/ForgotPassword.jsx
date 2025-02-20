import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || data.output) {
        toast.success("OTP sent successfully! Check your mail.");
        localStorage.setItem("email", email);

        // Redirect to verify-otp page after delay
        setTimeout(() => navigate("/verifyOTP"), 1500);
      } else {
        setMessage(data.error || "Something went wrong.");
        toast.error(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      setMessage("Failed to send password reset link.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Forgot Password?
        </h2>

        {/* Input Field */}
        <div className="relative mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Send Reset Link Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 p-4 rounded-lg font-semibold text-white shadow-lg"
        >
          Send Reset Link
        </button>

        {/* Error Message */}
        {message && <p className="text-center text-red-400 mt-4">{message}</p>}

        {/* Links Section */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition text-lg"
          >
            Back to Login
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <Toaster position="top-center" />
    </div>
  );
};

export default ForgotPassword;
