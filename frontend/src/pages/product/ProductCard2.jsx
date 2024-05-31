/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import HeartIcon from "./HeartIcon.jsx";

const ProductCard2 = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity: quantity }));
    toast.success("Added to cart", {
      autoClose: 1000,
    });
  };
  return (
    <div className="w-[286px] min-h-[380px] shadow-2xl relative ">
      <span className="absolute top-0 left-0 bg-black text-white py-1 px-2 text-xs font-semibold tracking-wide">
        NEW
      </span>
      <Link to={`/product/${product._id}`} className="">
        <div className="w-[286px] h-[250px] flex items-center py-3 bg-[#F0F0F0] justify-center">
          <img src={product.images.image1} className="h-full pt-4" />
        </div>
      </Link>

      <div className="flex justify-between flex-col">
        <div className="m-5 flex flex-col">
          <label className="font-bold text-md pb-" title={product.name}>
            {product.name}
          </label>

          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-sm ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-400 ml-1">
              ({product?.numReviews} reviews)
            </span>
          </div>

          <span className="mt-2 text-blue-900 text-xl font-mono">
            $ {product.price.toFixed(2)}
          </span>
        </div>
        <div
          className="flex bg-black text-white font-medium text-sm px-5 py-2.5 items-center justify-center gap-2 cursor-pointer"
          onClick={() => handleAddToCart(product, 1)}
        >
          <FaShoppingCart />
          <button className="">Add to cart</button>
        </div>
      </div>
      <HeartIcon product={product} />
    </div>
  );
};

export default ProductCard2;
