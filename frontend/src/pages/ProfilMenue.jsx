import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice.js";
import { useLogoutUserMutation } from "../redux/api/userApiSlice.js";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="relative">
      <a className="nav-link" href="#" onClick={toggleMenu}>
        <FaUserCircle className="hover:text-gray-200" size={24} />
      </a>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
          <Link
            className="border-b flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
            to={"/profile"}
          >
            Profile
          </Link>
          {userInfo?.isAdmin && (
            <Link
              className="border-b flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              to={"/admin"}
            >
              Admin Menu
            </Link>
          )}

          {!userInfo ? (
            <Link
              className="border-b flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              to={"/login"}
            >
              Login
            </Link>
          ) : (
            <Link
              className="border-b flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
