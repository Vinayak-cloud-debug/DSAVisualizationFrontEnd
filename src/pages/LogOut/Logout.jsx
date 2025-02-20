import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Toaster } from "react-hot-toast";

const Logout = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto '>
			{!loading ? (
				<BiLogOut className="w-6 h-6 text-red-700 cursor-pointer" onClick={logout} />
			) :null}
			
			<Toaster/>
		</div>
	);
};
export default Logout;