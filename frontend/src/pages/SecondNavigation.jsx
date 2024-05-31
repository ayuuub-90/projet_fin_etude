import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import FavoritesCount from "../redux/features/favorites/FavoritesCount";
import CartCount from "../redux/features/cart/CartCount";

const SecondNavigation = () => {

  return (
    <>
      <div className="sticky z-10 top-0 bg-white border-b w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="w-full box-sizing h-[55px] flex justify-between ">
          <div className="flex justify-between ml-[10rem] ">
          </div>
          <div className="flex justify-between mr-[10rem] ">
            <Link className="relative flex justify-around px-6" to={"/favorites"}>
              <FaHeart title="favorites" className="h-[25px] mt-3 mb-3" />
              <FavoritesCount />
            </Link>

            <Link className="relative flex justify-around px-6" to={"/cart"}>
              <FaShoppingCart title="cart" className="h-[25px] mt-3 mb-3" />
              <CartCount />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondNavigation;
