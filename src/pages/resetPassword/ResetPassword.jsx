
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("email");
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to reset password.");
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("An error occurred.");
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>

        <div className="relative">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-500 transition-all p-3 rounded-lg font-semibold text-white mt-4"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        {message && <p className="text-center text-red-400 mt-3">{message}</p>}

        <div className="flex justify-center mt-4">
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
            Back to Login
          </Link>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default ResetPassword;

