import { BiLogOut } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const Logout = () => {

	const { setAuthUser } = useAuthContext();

	const logOut = async()=>{

	
	try {
            
			
		const res = await fetch("http://localhost:5000/api/auth/logout", {
			method: "POST",
			credentials:"include",
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (data.error) {
			throw new Error(data.error);
		}

		localStorage.removeItem("chat-user");
		setAuthUser(null);
		toast.success('Logged Out Successfully!')
	} catch (error) {
		toast.error(error.message);
	} 
	}

	return (
		<div className='mt-auto '>
			
				<BiLogOut className="w-6 h-6 text-red-700 cursor-pointer" onClick={logOut} />
			
			
			<Toaster/>
		</div>
	);
};
export default Logout;