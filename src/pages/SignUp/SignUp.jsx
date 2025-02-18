import { Link, useNavigate } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});



	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const [gmailVerified,setgmailVerified] = useState(false)
	const [OtpVerified,setOtpVerified] = useState(false)



	const [GmailValue,setGmailValue] = useState('')
	const [OtpValue,setOtpValue] = useState('')

	const [GenOTp,setGenOtp] = useState('')



	const VerifyOtp=()=>{


		if(OtpValue === GenOTp){
			toast.success("Otp Verified")
			setOtpVerified(true)
		}
		else{
			toast.success("Invalid Otp")
			setOtpVerified(false)
			setgmailVerified(false)
		}

	}


	const navigate = useNavigate()

	const VerifyGmail = async(e) =>{

		e.preventDefault()

		try {
			
			

			const response = await fetch('/api/auth/Verify-Gmail', {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			  body:JSON.stringify({GmailValue})
			});
	  
			

			const data = await response.json();
			console.log(data)
			
			
			if (data.otp) {

				setGenOtp(data.otp)
			  toast.success("OTP sent successfully ! ")
			  setgmailVerified(true)
			} else {
			  toast.error(data.error || 'Invalid OTP.');
			}
		  } catch (error) {
			toast.error('Failed to verify OTP.'+error.message);
		  }

	}


	const handleSubmit = async (e) => {

		e.preventDefault();

		await signup(inputs);

		navigate('/home')
			
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-gray-800 rounded-2xl'>
			<div className='w-full p-6 flex flex-col gap-[20px] rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

				{gmailVerified && OtpVerified ? 
				<div>
					<div>
						<label className='label p-2 ' >
						</label>
						<input
							type='text'
							placeholder='Enter your Name'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
						</label>
						<input
							type='text'
							placeholder='Enter your Email'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
					
					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						
					>
						Already have an account?
					</Link>
				

					<div>
					
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>

				</div>
				: null}
				
				{!gmailVerified ? 
				<div>
					
					<label className='label'>
					</label>
					<input
						type='text'
						placeholder='Enter Gmail'
						className='w-full input input-bordered h-10'
						value={GmailValue}
						onChange={(e) => setGmailValue(e.target.value)}
					/>

					<div>
						
						<button onClick={VerifyGmail} className='btn btn-block btn-sm mt-2 border border-slate-700'>
							VerifyGmail
						</button>
					</div>
				</div> 
				:null}


				{gmailVerified && !OtpVerified ?
				<div>
					
				<label className='label'>
				</label>
				<input
					type='password'
					placeholder='Confirm Password'
					className='w-full input input-bordered h-10'
					value={OtpValue}
					onChange={(e) => setOtpValue(e.target.value)}
				/>

				<div>
					
					<button onClick={VerifyOtp} className='btn btn-block btn-sm mt-2 border border-slate-700'>
						VerifyOtp
					</button>
				</div>
				</div>
				:null}
				

					
				</form>
			</div>

			<Toaster/>
		</div>
	);
};
export default SignUp;