import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Toaster, toast } from "react-hot-toast";

const Logout = () => {


	const LogOut = async (e) =>{
		e.preventDefault();
		  try {
			// Call backend logout endpoint
			const res = await fetch("https://dsavisualizationbackend-tmii.onrender.com/api/auth/logout", {
				method: "POST",
				credentials: "include", // Ensures cookies are sent with the request
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Logout failed");
			}

			// Remove user data from localStorage
			localStorage.removeItem("chat-user");

			// Show success message
			toast.success("Logged out successfully!");

			// Reload or redirect user to login page
			window.location.href = '/';
		} catch (error) {
			console.error("Logout error:", error.message);
			toast.error(error.message);
		}
	}

	return (
		<div className='mt-auto '>
		
			<BiLogOut className="w-6 h-6 text-red-700 cursor-pointer" onClick={LogOut} />
			
			<Toaster/>
		</div>
	);
};
export default Logout;
