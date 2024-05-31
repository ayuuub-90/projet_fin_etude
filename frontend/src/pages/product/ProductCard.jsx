/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity: quantity }));
    toast.success("Added to cart", {
      autoClose: 1000,
    });
  };

  return (
    <>
      <div className="w-[286px] h-[350px] border hover:bg-gray-50 relative ">
        <Link to={`/product/${product._id}`}>
          <div className="w-[286px] h-[250px] flex items-center justify-center">
            <img src={product.images.image1} className="h-full pt-4" />
          </div>
        </Link>

        <div className="flex justify-between">
          <div className="m-5 flex flex-col">
            <label className="font-medium text-[18px] " title={product.name}>
              {product.name.slice(0, 20)}
            </label>
            <span className="mt-2 text-blue-900 font-medium">
              $ {product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center mr-8 ">
            <FaShoppingCart
              onClick={() => handleAddToCart(product, 1)}
              className=" w-[20px] h-[20px] cursor-pointer"
              title="Add To Cart"
            />
          </div>
        </div>
        <HeartIcon product={product} />
      </div>
    </>
  );
};

export default ProductCard;
