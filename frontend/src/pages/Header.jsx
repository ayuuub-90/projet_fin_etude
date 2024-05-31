/* import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLoginBoxFill, RiLogoutBoxRFill, RiAdminFill  } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/api/userApiSlice.js";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full box-sizing border h-[30px] flex justify-between ">
      <div className="flex justify-between mx-4">
        <Link className="flex justify-around px-4" to={"+402-464-2441"}>
          <FaPhoneAlt className="h-[25px] mr-1" />
          +402-464-2441
        </Link>
        <Link className="flex justify-around" to={"shopjsx@gmail.com"}>
          <MdEmail className="h-[25px] mr-1" />
          e-shop@gmail.com
        </Link>
      </div>
      <div className="flex justify-between mx-4">
        {userInfo?.isAdmin && (
          <Link className="flex justify-around" to={"/admin"}>
            <RiAdminFill className="h-[25px] mr-1" />
            Admin Menu
          </Link>
        )}
        <Link className="flex justify-around px-4" to={"/profile"}>
          <FaUserCircle className="h-[25px] mr-1" />
          My account
        </Link>
        {!userInfo ? (
          <Link className="flex justify-around" to={"/login"}>
            <RiLoginBoxFill className="h-[25px] mr-1" />
            Login
          </Link>
        ) : (
          <Link className="flex justify-around" onClick={logoutHandler}>
            <RiLogoutBoxRFill className="h-[25px] mr-1" />
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
 */
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLoginBoxFill, RiLogoutBoxRFill, RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/api/userApiSlice.js";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full bg-gray-900 text-gray-200 py-2 px-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <FaPhoneAlt className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">+402-464-2441</span>
          </div>
          <div className="flex items-center">
            <MdEmail className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">e-shop@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        {userInfo?.isAdmin && (
          <Link to="/admin" className="flex items-center space-x-1 text-gray-400 hover:text-gray-300">
            <RiAdminFill className="h-5 w-5" />
            <span className="hidden md:inline">Admin Menu</span>
          </Link>
        )}
        <Link to="/profile" className="flex items-center space-x-1 text-gray-400 hover:text-gray-300">
          <FaUserCircle className="h-5 w-5" />
          <span className="hidden md:inline">My Account</span>
        </Link>
        {!userInfo ? (
          <Link to="/login" className="flex items-center space-x-1 text-gray-400 hover:text-gray-300">
            <RiLoginBoxFill className="h-5 w-5" />
            <span className="hidden md:inline">Login</span>
          </Link>
        ) : (
          <button onClick={logoutHandler} className="flex items-center space-x-1 cursor-pointer text-gray-400 hover:text-gray-300">
            <RiLogoutBoxRFill className="h-5 w-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
  
};

export default Header;
