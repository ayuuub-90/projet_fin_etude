import { useEffect, useState } from "react";
import Navigation from "./Navigation.jsx";
import { useSendMessageMutation } from "../redux/api/messageApiSlice.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { IoManSharp } from "react-icons/io5";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYahoo,
} from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const ContactUs = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [content, setContent] = useState("");

  const [sendMessage] = useSendMessageMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    // const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // if (emailRegex.test(email)) {
    //   return toast.error("email is not a valid email");
    // }
    try {
      await sendMessage({
        firstname,
        lastname,
        email,
        reason,
        content,
      }).unwrap();
      toast.success("Reclamation sent successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex items-center justify-center h-[88vh] w-full ">
        <div className="w-[1000px] max-md:w-full h-[600px] max-md:h-full rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-md:shadow-none">
          <div className="text-center text-2xl font-bold py-4 max-md:pt-8 tracking-wider">
            GET IN TOUCH
          </div>
          <div className="flex justify-between h-[551px] w-full max-md:flex-col ">
            <div className="w-[50%] max-md:w-full m-4 mt-16 text-gray-500 max-md:mt-3 max-md:m-0 max-md:p-4 max-md:border-t">
              <div className="flex flex-col gap-3 ml-10 max-md:m-0 ">
                <div className="flex items-center">
                  <IoManSharp className="mr-2" />
                  <span>123, Rue Mohemmed six eleven</span>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  <span>+249-4696-535</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-2" />
                  <span>email@example.com</span>
                </div>
                <div className="flex items-center gap-4 mt-5">
                  <FaFacebookF className="hover:text-blue-500" />
                  <FaInstagram className="hover:text-pink-600" />
                  <FaXTwitter className="hover:text-black" />
                  <FaLinkedinIn className="hover:text-blue-800" />
                  <FaYahoo className="hover:text-violet-700" />
                </div>
                <div className="mt-3">
                  {/* <img
                    src="/uploads\coordination-estm.jpeg"
                    alt="coordination"
                    className="w-[320px] "
                  /> */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6626.494386703383!2d-5.581604360105863!3d33.857519779496286!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05aa3aa69119f%3A0x227685e2846b5a39!2sHigher%20School%20of%20Technology!5e0!3m2!1sen!2sma!4v1709984177705!5m2!1sen!2sma"
                    className="border-0 w-full h-[200px] "
                    allowfullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="right w-[50%] max-md:w-full m-4 mt-14 max-md:m-0 max-md:p-4">
              <h1 className="font-medium text-gray-800 tracking-wide text-xl mb-3 max-md:mb-8">
                Leave us a message
              </h1>
              <div className="flex flex-col gap-2 ">
                <input
                  type="text"
                  placeholder="first name"
                  className="bg-gray-50 outline-none p-2 text-gray-500"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="last name"
                  className="bg-gray-50 outline-none p-2  text-gray-500"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="email"
                  className="bg-gray-50 outline-none p-2  text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  className="bg-gray-50 outline-none p-2  text-gray-500"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  value={reason}
                >
                  <option defaultValue={""}>select reason</option>
                  <option value="livraison">Livraison</option>
                  <option value="location">Location</option>
                  <option value="authenticate">Autheniticate</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  type="text"
                  placeholder="content"
                  className="bg-gray-50 outline-none p-2  text-gray-500 resize-none"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  className="bg-gray-900 text-white py-2 mt-4 rounded"
                  onClick={handleSubmit}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
