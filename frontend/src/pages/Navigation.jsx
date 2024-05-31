import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import FavoritesCount from "../redux/features/favorites/FavoritesCount";
import CartCount from "../redux/features/cart/CartCount";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ProfileMenu from "./ProfilMenue";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/api/userApiSlice.js";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

const Navigation = () => {
  const [menu, setMenu] = useState(false);
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
    <div className="sticky top-0 bg-[#222831] text-white w-full z-50 h-16">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          <Link
            className="text-3xl font-bold font-heading max-lg:text-xl"
            to={"/"}
            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
          >
            E-Shop
          </Link>
          <div className="hidden lg:flex space-x-4 font-semibold font-heading">
            <Link
              className="flex items-center px-6 py-3 text-gray-100 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md"
              to={"/"}
            >
              <span>Home</span>
            </Link>
            <Link
              className="flex items-center px-6 py-3 text-gray-100 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md"
              to={"/products"}
            >
              <span>Products</span>
            </Link>
            <Link
              className="flex items-center px-6 py-3 text-gray-100 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md"
              to={"/contact"}
            >
              <span>Contact </span>
            </Link>
            <Link
              className="flex items-center px-6 py-3 text-gray-100 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md"
              to={"/about"}
            >
              <span>About</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-5">
            <Link
              className="flex items-center space-x-1 px-29 text-gray-600"
              to={"/favorites"}
            >
              <FaHeart className="size-5 text-gray-100" />

              <FavoritesCount />
            </Link>

            <Link
              className="flex items-center space-x-1 px-6 text-gray-600"
              to={"/cart"}
            >
              <FaShoppingCart className="size-5 text-gray-100" />

              <CartCount />
            </Link>

            <div className="flex items-center space-x-2">
              <ProfileMenu />
            </div>
          </div>

          <div className="flex lg:hidden">
            {menu ? (
              <IoMdClose
                className="size-6 z-50"
                onClick={() => setMenu(false)}
              />
            ) : (
              <IoMdMenu className="size-6" onClick={() => setMenu(true)} />
            )}
            {menu && (
              <>
                <div className="bg-black/50 fixed top-0 left-0 w-1/2 h-full" onClick={() => setMenu(false)}></div>
                <div className="bg-gray-900 w-1/2 h-full fixed top-0 right-0 flex flex-col gap-5 pt-16 text-black ">
                  <ul className="flex flex-col text-lg text-white">
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/"}
                      className="cursor-pointer p-2 w-full border-y border-gray-500 text-sm"
                    >
                      Accueil
                    </Link>
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/products"}
                      className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                    >
                      Products
                    </Link>
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/contact"}
                      className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                    >
                      Contact
                    </Link>
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/about"}
                      className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                    >
                      About
                    </Link>
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/favorites"}
                      className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                    >
                      Favorites
                    </Link>
                    <Link
                      onClick={() => setMenu(false)}
                      to={"/cart"}
                      className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                    >
                      Cart
                    </Link>
                    {userInfo ? (
                      <>
                        <Link
                          onClick={() => setMenu(false)}
                          to={"/profile"}
                          className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                        >
                          Profile
                        </Link>
                        <span
                          onClick={() => {
                            setMenu(false);
                            logoutHandler();
                          }}
                          className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                        >
                          Logout
                        </span>
                      </>
                    ) : (
                      <Link
                        onClick={() => setMenu(false)}
                        to={"/login"}
                        className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                      >
                        Login
                      </Link>
                    )}
                    {userInfo?.isAdmin && (
                      <Link
                        onClick={() => setMenu(false)}
                        to={"/admin"}
                        className="cursor-pointer p-2 w-full border-b border-gray-500 text-sm"
                      >
                        Admin menu
                      </Link>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
