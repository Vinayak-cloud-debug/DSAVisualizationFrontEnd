
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    if (!loading) navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl shadow-lg p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login To <span className="text-green-500">Algo</span>{" "}
          <span className="text-amber-500">Vision</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password & Signup Links */}
          <div className="flex justify-between text-sm">
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 transition"
            >
              Don't have an account?
            </Link>
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-green-600 hover:bg-green-500 transition-all p-3 rounded-lg font-semibold text-white flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <Toaster />
      </div>
    </div>
  );
};

export default Login;

