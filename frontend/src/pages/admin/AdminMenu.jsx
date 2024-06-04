import { useState } from "react";
import { FaUserCircle, FaBox } from "react-icons/fa";
import { MdDashboard, MdCategory, MdMessage } from "react-icons/md";
import { CgAtlasian } from "react-icons/cg";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaBuysellads } from "react-icons/fa6";
import { IoBagCheck } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import UsersList from "./UsersList.jsx";
import CategoriesList from "./CategoriesList.jsx";
import ProductsList from "./ProductsList.jsx";
import PubsList from "./PubsList.jsx";
import Navigation from "../Navigation.jsx";
import MessagesList from "./MessagesList.jsx";
import BrandsList from "./BrandsList.jsx";
import OrderList from "./OrderList.jsx";
import DashBoard from "./DashBoard.jsx";

const AdminMenu = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeProfile = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Navigation />
      <div className="center h-[92vh] max-md:h-auto">
        <div className="relative w-[1450px] max-md:w-full max-md:flex-col flex flex-row h-[700px] max-md:h-auto bg-white rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-md:shadow-none">
          {/* close icon "x" */}
          <div
            className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 max-md:hidden"
            onClick={closeProfile}
          >
            <IoMdClose />
          </div>

          {/* left side which have the menu */}
          <div className="bg-gray-100 h-full w-[230px] max-md:w-full overflow max-md:hidden">
            <div className="h-[180px] w-[230px] flex justify-center items-center flex-col">
              <FaUserCircle className="h-[50px] w-[50px] text-gray-300" />
              <Link to={"/profile"} className="mt-2">
                <span className="font-semibold">
                  {userInfo.firstname.toUpperCase()}{" "}
                  {userInfo.lastname.toUpperCase()}{" "}
                </span>
              </Link>
            </div>
            <div className="w-full h-[520px] ">
              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 1 ? "bg-white" : ""}`}
                onClick={() => setPage(1)}
              >
                <MdDashboard className="mx-[10px] " />
                <span>Dashboard</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 2 ? "bg-white" : ""}`}
                onClick={() => setPage(2)}
              >
                <IoBagCheck className="mx-[10px] " />
                <span>Orders</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 3 ? "bg-white" : ""}`}
                onClick={() => setPage(3)}
              >
                <PiUsersFill className="mx-[10px] " />
                <span>Customers</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 4 ? "bg-white" : ""}`}
                onClick={() => setPage(4)}
              >
                <MdCategory className="mx-[10px] " />
                <span>Categories</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 8 ? "bg-white" : ""}`}
                onClick={() => setPage(8)}
              >
                <CgAtlasian className="mx-[10px] " />
                <span>Brands</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 5 ? "bg-white" : ""}`}
                onClick={() => setPage(5)}
              >
                <FaBox className="mx-[10px] " />
                <span>Products</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 6 ? "bg-white" : ""}`}
                onClick={() => setPage(6)}
              >
                <FaBuysellads className="mx-[10px] " />
                <span>Products Pub</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 7 ? "bg-white" : ""}`}
                onClick={() => setPage(7)}
              >
                <MdMessage className="mx-[10px] " />
                <span>Reclamations</span>
              </div>
            </div>
          </div>

          {menuOpen && (
            <>
              <div
                className="bg-white/50 fixed top-0 left-0 w-1/2 h-full"
                onClick={() => setMenuOpen(false)}
              ></div>

              <div className="bg-white z-50 border shadow-2xl w-1/2 h-full fixed top-0 right-0 flex flex-col text-black ">
                <div className="h-[62px] flex items-center px-6 text-lg font-medium">
                  Admin menu
                </div>
                <ul className="flex flex-col text-sm">
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 1 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(1);
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 2 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(2);
                      setMenuOpen(false);
                    }}
                  >
                    Orders
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 3 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(3);
                      setMenuOpen(false);
                    }}
                  >
                    Customers
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 4 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(4);
                      setMenuOpen(false);
                    }}
                  >
                    Categories
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 8 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(8);
                      setMenuOpen(false);
                    }}
                  >
                    Brands
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 5 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(5);
                      setMenuOpen(false);
                    }}
                  >
                    Products
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 6 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(6);
                      setMenuOpen(false);
                    }}
                  >
                    Products Pub
                  </div>
                  <div
                    className={`hover:bg-gray-50 cursor-pointer w-full h-10 flex items-center px-4 border-y ${
                      page === 7 && "bg-white"
                    } `}
                    onClick={() => {
                      setPage(7);
                      setMenuOpen(false);
                    }}
                  >
                    Reclamations
                  </div>
                </ul>
              </div>
            </>
          )}

          {/* main side which show information */}
          <div className="bg-white h-full max-md:h-auto w-[1220px] max-md:w-full">
            <div className="bg-white w-full h-12 hidden max-md:flex border-b justify-between items-center px-4">
              <h1 className="font-medium">Admin menu</h1>
              <IoMdMenu onClick={() => setMenuOpen(!menuOpen)} />
            </div>

            {page === 1 && (
              <div className="m-10 max-md:m-1">
                <DashBoard />
              </div>
            )}
            {page === 2 && (
              <div className="m-10 max-md:m-1">
                <OrderList />
              </div>
            )}

            {page === 3 && (
              <div className="m-10 max-md:m-1">
                <UsersList />
              </div>
            )}
            {page === 4 && (
              <div className="m-10 max-md:m-1">
                <CategoriesList />
              </div>
            )}
            {page === 5 && (
              <div className="m-10 max-md:m-1">
                <ProductsList />
              </div>
            )}
            {page === 6 && (
              <div className="m-10 max-md:m-1">
                <PubsList />
              </div>
            )}
            {page === 7 && (
              <div className="m-10 max-md:m-1">
                <MessagesList />
              </div>
            )}
            {page === 8 && (
              <div className="m-10 max-md:m-1">
                <BrandsList />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
