import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { Toaster } from "react-hot-toast";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
		if(loading)
			navigate('/home')
	};

	return (
		<div className='flex flex-col relative items-center justify-center min-w-96 mx-auto bg-gray-800 rounded-2xl'>
			
			<div className='w-full p-6 flex flex-col gap-[20px] rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<div className="text-3xl font-semibold">Login To Hack <span className='text-green-700' >The</span> <span className='text-amber-700' >Code</span></div>


				<form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
					<div>
						<label className='label p-2'>
							
						</label>
						<input
							type='text'
							placeholder='Enter your Email'
							className='w-full  input input-bordered p-2 h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							
						</label>
						<input
								type="password"
							
								placeholder="Enter Password"
								className="w-full input input-bordered rounded-md p-2 h-10"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								/>

					</div>

					<div className='flex justify-between items-center'>
						<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
							{"Don't"} have an account?
						</Link>

						<Link to='/forgot-password' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
							Forgot Password
						</Link>
					</div>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
			<Toaster/>
		</div>
	);
};
export default Login;
