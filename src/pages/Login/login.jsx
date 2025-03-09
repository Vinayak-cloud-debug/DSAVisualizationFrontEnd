
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingVal,setLoadingVal] = useState(0)

  // const { loading, login } = useLogin();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {

    setLoadingVal(1)
    e.preventDefault();
    try {

			console.log(username+" "+password)

			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
        credentials:"include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			console.log(res.data)

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

      setTimeout(()=>{
        setLoadingVal(0)
      },500)

			
			toast.success('Logged In Successfully!')
      navigate("/");

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

		} catch (error) {
			toast.error(error.message);
      setLoadingVal(0)
		} 
    
  };

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gray-900 px-4">
       {loadingVal ?
          <div className="fixed top-5 transform   p-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideDown">
            <div className="text-lg text-white font-medium">Loading</div>
            <div className="flex items-center justify-center space-x-2">
              <PulseLoader color="#36d7b7" size={10} margin={2} />
            </div>
          </div>
          : null}

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
          >
            Login
          </button>
        </form>

       


        <Toaster />
      </div>
    </div>
  );
};

export default Login;

