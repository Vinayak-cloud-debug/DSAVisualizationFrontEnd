


import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox";
import { useAuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  
  const [gmailVerified, setGmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [gmailValue, setGmailValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [genOtp, setGenOtp] = useState("");

  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const verifyOtp = () => {
    if (otpValue === genOtp) {
      toast.success("OTP Verified");
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP");
      setOtpVerified(false);
      setGmailVerified(false);
    }
  };

  const verifyGmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/Verify-Gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GmailValue: gmailValue }),
      });

      const data = await response.json();
      if (data.otp) {
        setGenOtp(data.otp);
        toast.success("OTP sent successfully!");
        setGmailVerified(true);
      } else {
        toast.error(data.error || "Invalid OTP.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. " + error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
			const res = await fetch("http://localhost:5000/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			
			localStorage.setItem("chat-user", JSON.stringify(data));
			console.log(localStorage.getItem("chat-user"));
			setAuthUser(data);

			toast.success('Signed Up Successfully !')
		} catch (error) {
			toast.error(error.message);
		} 

    if(localStorage.getItem("chat-user") != null){
        navigate("/home");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">
          Sign Up for <span className="text-blue-500">Algo Vision</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!gmailVerified ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter Gmail</label>
              <input
                type="text"
                placeholder="Enter your Gmail"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                value={gmailValue}
                onChange={(e) => setGmailValue(e.target.value)}
              />
              <button
                onClick={verifyGmail}
                className="w-full bg-blue-600 hover:bg-blue-500 transition-all p-3 rounded-lg font-semibold text-white mt-3"
              >
                Verify Gmail
              </button>
            </div>
          ) : !otpVerified ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 hover:bg-green-500 transition-all p-3 rounded-lg font-semibold text-white mt-3"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputs.fullName}
                  onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputs.confirmPassword}
                  onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                />
              </div>

              <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

              <div className="flex justify-between text-sm mt-3">
                <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
                  Already have an account?
                </Link>
              </div>

              <button
                
                
                className="w-full bg-green-600 hover:bg-green-500 transition-all p-3 rounded-lg font-semibold text-white"
                
              >
                <span ></span>Sign Up
              </button>
            </>
          )}
        </form>

        <Toaster />
      </div>
    </div>
  );
};

export default SignUp;
