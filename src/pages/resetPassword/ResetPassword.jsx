import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    try {
      var email = localStorage.getItem("email")
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password }),
      });


      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("email")
        toast.success("Password has been reset successfully .... redirecting to login")
        setTimeout(()=>{

          navigate('/login')
        },1000)
      } else {
        setMessage(data.error || 'Failed to reset password.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <input
        type="password"
        placeholder="Enter new password"
        className="input input-bordered w-full max-w-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn mt-4" onClick={handleResetPassword}>
        Reset Password
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}

      <Link to='/login' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
			Login
	</Link>

  <Toaster/>
    </div>
  );
};

export default ResetPassword;
