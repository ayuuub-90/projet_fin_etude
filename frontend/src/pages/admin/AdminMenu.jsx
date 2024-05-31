import { useState } from "react";
import { FaUserCircle, FaBox } from "react-icons/fa";
import { MdDashboard, MdCategory, MdMessage } from "react-icons/md";
import { CgAtlasian } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
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

  const closeProfile = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center h-[92vh]">
        <div className="relative w-[1450px] max-md:w-full max-md:flex-col flex flex-row h-[700px] bg-white rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-md:shadow-none">
          <div
            className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 max-md:hidden"
            onClick={closeProfile}
          >
            <IoMdClose />
          </div>

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

          <div className="bg-white h-full w-[1220px] max-md:w-full max-md:my-4 ">
            {page === 1 && (
              <div className="m-10">
                <DashBoard />
              </div>
            )}
            {page === 2 && (
              <div className="m-10">
                <OrderList />
              </div>
            )}

            {page === 3 && (
              <div className="m-10">
                <UsersList />
              </div>
            )}
            {page === 4 && (
              <div className="m-10">
                <CategoriesList />
              </div>
            )}
            {page === 5 && (
              <div className="m-10">
                <ProductsList />
              </div>
            )}
            {page === 6 && (
              <div className="m-10">
                <PubsList />
              </div>
            )}
            {page === 7 && (
              <div className="m-10">
                <MessagesList />
              </div>
            )}
            {page === 8 && (
              <div className="m-10">
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
