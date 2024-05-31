import { useNavigate } from "react-router";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useUpdateCurrentUserMutation,
  useAddShippingAddressMutation,
  useChangeCurrentPasswordMutation,
} from "../../redux/api/userApiSlice.js";
import { setCredintials } from "../../redux/features/auth/authSlice.js";
import Navigation from "../Navigation.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [changeCurrentPassword] = useChangeCurrentPasswordMutation();

  const [page, setPage] = useState(1);

  const [firstname, setFirstname] = useState(userInfo?.firstname);
  const [lastname, setLastname] = useState(userInfo?.lastname);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.phone);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [address, setAddress] =
    useState(userInfo?.shippingAddress?.address) || "";
  const [country, setCountry] =
    useState(userInfo?.shippingAddress?.country) || "";
  const [city, setCity] = useState(userInfo?.shippingAddress?.city) || "";
  const [postalCode, setPostalCode] =
    useState(userInfo?.shippingAddress?.postalCode) || "";

  const closeProfile = () => {
    navigate("/");
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please enter your new password ");
    }
    if (password !== confirmPassword) {
      return toast.error("passwords do not match");
    }
    try {
      const res = await changeCurrentPassword({ password }).unwrap();
      dispatch(setCredintials({ ...res }));
      toast.success("passwords changed successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !phone) {
      return toast.error("all fields are required");
    }
    try {
      const res = await updateCurrentUser({
        firstname,
        lastname,
        email,
        phone,
      }).unwrap();
      dispatch(setCredintials({ ...res }));
      toast.success(`user info updated successfully`);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addShippingAddress({
        address,
        country,
        city,
        postalCode,
      }).unwrap();
      dispatch(setCredintials({ ...res }));
      toast.success("Shipping address updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-full flex justify-center items-center h-[90vh] max-md:h-auto ">
        <div className="relative h-[600px] max-md:h-full w-[730px] max-md:w-full bg-transparent rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-md:shadow-none flex flex-row max-md:flex-col">
          <div
            className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 max-md:hidden"
            onClick={closeProfile}
          >
            <IoMdClose />
          </div>

          <div className="bg-gray-100 h-full w-[300px] max-md:hidden">
            <div className="w-full h-[300px] flex justify-center items-center">
              <FaUserCircle className="h-[250px] w-[250px] text-gray-300" />
            </div>
            <div className="h-[300px] w-full mt-[2rem] ">
              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 1 ? "bg-white" : ""}`}
                onClick={() => setPage(1)}
              >
                <TbListDetails className="mx-[10px] " />
                <span>Account Details</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 2 ? "bg-white" : ""}`}
                onClick={() => setPage(2)}
              >
                <MdLocalShipping className="mx-[10px] " />
                <span>Shipping Address</span>
              </div>

              <div
                className={`flex flex-row pl-[20px] h-14 items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 3 ? "bg-white" : ""}`}
                onClick={() => setPage(3)}
              >
                <IoMdSettings className="mx-[10px] " />
                <span>Change Password</span>
              </div>
            </div>
          </div>

          <div className="max-md:flex hidden h-10 w-full">
            <div
              className={`flex flex-row items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 1 ? "bg-white w-full" : "bg-gray-200"}`}
              onClick={() => setPage(1)}
            >
              <TbListDetails className="mx-[10px] " />
              <span>{page === 1 ? "Account Details": "Accou..."}</span>
            </div>

           
              <div
                className={`flex flex-row items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 2 ? "bg-white w-full" : "bg-gray-200"}`}
                onClick={() => setPage(2)}
              >
                <MdLocalShipping className="mx-[10px] " />
                <span>{page === 2 ? "Shipping Address": "Shippi..."}</span>
              </div>
    
              <div
                className={`flex flex-row items-center cursor-pointer text-gray-800 hover:bg-white 
              ${page === 3 ? "bg-white w-full" : "bg-gray-200"}`}
                onClick={() => setPage(3)}
              >
                <IoMdSettings className="mx-[10px] " />
                <span>{page === 3 ? "Change Password": "Change..."}</span>
              </div>
          </div>

          <div className="h-full w-[430px] max-md:w-full">
            {page === 1 && (
              <>
                <form
                  className=" h-[100%] m-6 mt-[3rem] rounded"
                  onSubmit={submitHandler}
                >
                  <h1 className="mb-[3rem] max-md:mb-3 text-4xl font-medium max-md:text-xl">
                    Account Details
                  </h1>
                  <label className="text-gray-500">firstname: *</label>
                  <input
                    type="text"
                    placeholder="first name"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label className="text-gray-500">lastname: *</label>
                  <input
                    type="text"
                    placeholder="last name"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label className="text-gray-500">phone: *</label>
                  <input
                    type="text"
                    placeholder="phone number"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label className="text-gray-500">email: *</label>
                  <input
                    type="email"
                    placeholder="email address"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-[100%] h-[40px] mt-10 rounded pl-2 bg-black text-white"
                  >
                    UPDATE
                  </button>
                </form>
              </>
            )}
            {page === 2 && (
              <>
                <form
                  className=" h-[100%] m-6 mt-[3rem] rounded"
                  onSubmit={addHandler}
                >
                  <h1 className="mb-[3rem] max-md:mb-3 text-4xl font-medium max-md:text-xl">
                    Shipping Address
                  </h1>
                  <label className="text-gray-500">Address: *</label>
                  <input
                    type="text"
                    placeholder="address"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="text-gray-500">Country: *</label>
                  <input
                    type="text"
                    placeholder="country"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <label className="text-gray-500">City: *</label>
                  <input
                    type="text"
                    placeholder="city"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label className="text-gray-500">Postal code: *</label>
                  <input
                    type="text"
                    placeholder="postal code"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-[100%] h-[40px] mt-10 rounded pl-2 bg-black text-white"
                  >
                    {userInfo?.shippingAddress ? "UPDATE" : "ADD"}
                  </button>
                </form>
              </>
            )}
            {page === 3 && (
              <>
                <form
                  className=" h-[100%] m-6 mt-[3rem] rounded"
                  onSubmit={changePassword}
                >
                  <h1 className="mb-[3rem] max-md:mb-3 text-4xl font-medium max-md:text-xl">
                    Change Password
                  </h1>
                  <label className="text-gray-500">New Password: </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="text-gray-500">
                    Confirm New Password:{" "}
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-[100%] h-[40px] mt-10 rounded pl-2 bg-black text-white"
                  >
                    Change password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
