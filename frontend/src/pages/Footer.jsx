import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 pt-20 pb-3 w-full">
      <div className="flex flex-col overflow-hidden">
        <div className="flex max-md:flex-col mb-[5rem]  text-gray-300 gap-24 max-md:gap-10">
          <div className="w-[600px] max-md:w-full px-20 max-md:px-10 ">
            <h1 className="text-4xl font-bold max-md:mb-1 mb-6 max-md:text-lg">E-Shop</h1>
            <p className="max-md:text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore in dignissimos est, velit nam excepturi sapiente obcaecati, aperiam fugiat recusandae cum necessitatibus rerum dolor laudantium explicabo. Deserunt cupiditate a ducimus facere maiores inventore dignissimos numquam. Ea aspernatur cumque quos. Soluta natus dicta unde vitae, minima quasi hic! Sunt. 
            </p>
          </div>

          <div className="w-[400px] px-20 max-md:px-10">
            <h1 className="text-xl font-bold max-md:mb-1 mb-6 max-md:text-lg">Information</h1>
            <div className="flex flex-col gap-2 max-md:text-sm">
                <Link>About Us</Link>
                <Link>Faq</Link>
                <Link>Terms And Conditions</Link>
                <Link>Contact Us</Link>
                <Link>Help</Link>
            </div>
          </div>

          <div className="w-[400px] px-20 max-md:px-10">
            <h1 className="text-xl font-bold max-md:mb-2 mb-6 max-md:text-lg">Get In Touch</h1>
            <div className="flex flex-col gap-2 max-md:text-sm">
                <span>NO.241 - Meknes, Marjane</span>
                <span>Morocco</span>
                <span>e-shop@gmail.com</span>
                <span>+34-6445-3421</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between mt-2 items-center px-20 max-md:px-3">
          <span className="text-gray-300 max-md:text-sm">
            copyright © {new Date().getFullYear()} - All rights reserved
          </span>
          <div className="text-gray-300 flex gap-4">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
