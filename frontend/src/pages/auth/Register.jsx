import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../../redux/api/userApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredintials } from "../../redux/features/auth/authSlice.js";
import Navigation from "../Navigation.jsx";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const phoneRegex = /^(?:(?:\+|00)212|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Invalid format phone number");
    }

    if (password !== confirmPassword) {
      return toast.error("Please confirm your password");
    }

    try {
      const res = await registerUser({
        firstname,
        lastname,
        email,
        phone,
        password,
      }).unwrap();
      const ress = await loginUser({ email, password }).unwrap();
      dispatch(setCredintials({ ...res }));
      dispatch(setCredintials({ ...ress }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const [eyeClosed, setEyeClosed] = useState(true);
  const [eyeClosedTwo, setEyeClosedTwo] = useState(true);

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="container h-[500px] w-[500px] max-lg:shadow-none shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] rounded overflow-hidden">
          <label>
            <h1 className="text-2xl text-center  max-lg:text-3xl max-lg:font-bold m-3 pt-4 font-medium">
              CREATE ACCOUNT
            </h1>
          </label>
          <form
            onSubmit={submitHandler}
            className=" h-[100%] m-6 mt-[3rem] rounded relative"
          >
            <div className="flex flex-row w-full h-[40px]">
              <input
                type="text"
                placeholder="first name"
                className="w-[50%] mr-1 pl-2 outline-none bg-gray-100"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type="text"
                placeholder="last name"
                className="w-[50%] pl-2 outline-none bg-gray-100"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="phone number"
              className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="email address"
              className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              id="password-register"
              className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {eyeClosed ? (
              <FaEyeSlash
                className="absolute text-gray-400 top-36 right-3"
                onClick={() => {
                  setEyeClosed(false);
                  document.getElementById("password-register").type = "text";
                }}
              />
            ) : (
              <FaEye
                className="absolute text-gray-400 top-36 right-3"
                onClick={() => {
                  setEyeClosed(true);
                  document.getElementById("password-register").type =
                    "password";
                }}
              />
            )}
            <input
              type="password"
              id="confirm-password"
              placeholder="confirm password"
              className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {eyeClosedTwo ? (
              <FaEyeSlash
                className="absolute text-gray-400 top-[190px] right-3"
                onClick={() => {
                  setEyeClosedTwo(false);
                  document.getElementById("confirm-password").type = "text";
                }}
              />
            ) : (
              <FaEye
                className="absolute text-gray-400 top-[190px] right-3"
                onClick={() => {
                  setEyeClosedTwo(true);
                  document.getElementById("confirm-password").type = "password";
                }}
              />
            )}
            <button
              type="submit"
              className="w-[100%] h-[40px] mt-10 rounded pl-2 bg-black text-white"
            >
              CREATE ACCOUNT
            </button>
            <div className="flex justify-between">
              <label>Already have an account?</label>{" "}
              <Link
                to={"/login"}
                className="bg-transparent underline font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
