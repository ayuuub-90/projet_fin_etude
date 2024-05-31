import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/userApiSlice.js";
import { toast } from "react-toastify";
import { setCredintials } from "../../redux/features/auth/authSlice";
import Navigation from "../Navigation.jsx";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const rederict = sp.get("rederict") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(rederict);
    }
  }, [userInfo, rederict, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredintials({ ...res }));
      navigate(rederict);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const [eyeClosed, setEyeClosed] = useState(true);

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="container h-[400px] w-[500px] rounded overflow-hidden max-lg:shadow-none shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
          <label>
            <h1 className="text-2xl text-center max-lg:text-3xl max-lg:font-bold m-3 pt-4 font-medium">
              WELCOME BACK
            </h1>
          </label>
          <form
            onSubmit={submitHandler}
            className=" h-[100%] m-6 mt-[3rem] rounded"
          >
            <input
              type="email"
              name="fname"
              autoComplete="on"
              placeholder="email"
              className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type="password"
                id="password"
                name="fname"
                autoComplete="on"
                placeholder="password"
                className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {eyeClosed ? (
                <FaEyeSlash
                  className="absolute text-gray-400 top-4 right-3"
                  onClick={() => {
                    setEyeClosed(false);
                    document.getElementById("password").type = "text";
                  }}
                />
              ) : (
                <FaEye
                  className="absolute text-gray-400 top-4 right-3"
                  onClick={() => {
                    setEyeClosed(true);
                    document.getElementById("password").type = "password";
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-[100%] h-[40px] mt-10 rounded pl-2 bg-black text-white"
            >
              LOGIN
            </button>
            <div className="flex justify-between">
              <label>Don{"'"}t have an account?</label>{" "}
              <Link
                to={"/register"}
                className="bg-transparent underline font-medium "
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
