/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./cartSlice";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  const handleUpdatePlus = (product, quantity) => {
    setQuantity(quantity+1)
    dispatch(addToCart({ ...product, quantity: quantity+1 }));
  };

  const handleUpdateMins = (product, quantity) => {
    setQuantity(quantity-1)
    dispatch(addToCart({ ...product, quantity: quantity-1 }));
  };

  return (
    <>
      <div className="h-32 max-md:h-20 bg-gray-50 my-2 overflow-hidden flex justify-around mr-2 max-md:mr-0">
        <div className="w-32 h-32 max-md:size-20 flex justify-center items-center ">
          <img
            src={product?.images?.image1}
            alt={product._id}
            className="h-28 object-cover max-md:h-14"
          />
        </div>
        <div className="flex flex-col ">
          <span className="pt-4 max-md:p-0 text-3xl font-medium max-md:text-[12px] max-md:h-8">
            {product.name.toUpperCase()}
          </span>
          <span className="text-gray-600 max-md:text-[10px] ">
            {(product.description.substring(0, 50)).toLowerCase()}...
          </span>
          <span className="pt-2 max-md:p-0 font-medium max-md:text-[10px]">{product.price} $</span>
        </div>

        <div className="w-[25%] flex items-center justify-end gap-16 max-md:gap-2">
          {quantity == 1 ? (
            <button
              disabled
              className="bg-gray-100 text-gray-400 cursor-not-allowed h-10 w-10 max-md:size-4 flex items-center justify-center font-bold text-2xl max-md:text-sm"
            >
              -
            </button>
          ) : (
            <button
              onClick={() => {
                handleUpdateMins(product, quantity);
              }}
              className="bg-gray-100 cursor-pointer h-10 w-10 max-md:size-4 flex items-center justify-center font-bold text-2xl max-md:text-sm"
            >
              -
            </button>
          )}
          <div className="text-4xl font-medium max-md:text-[12px]">{quantity}</div>
          {quantity == product.countInStock ? (
            <button
              disabled
              className="bg-gray-100 text-gray-400 cursor-not-allowed h-10 w-10 max-md:size-4 flex items-center justify-center font-bold text-2xl max-md:text-sm"
            >
              +
            </button>
          ) : (
            <button
              onClick={() => {
                handleUpdatePlus(product, quantity);
              }}
              className="bg-gray-100 cursor-pointer h-10 w-10 max-md:size-4 flex items-center justify-center font-bold text-2xl max-md:text-sm"
            >
              +
            </button>
          )}
        </div>

        <div className="w-[16%] items-center justify-end flex text-2xl font-bold max-md:text-[11px] ">
          {(product.price * product.quantity).toFixed(2)} $
        </div>
        <div className="w-[10%] flex items-center justify-center ">
          <IoCloseSharp
            title="remove product from inventory"
            onClick={() => handleDelete(product._id)}
            className="text-gray-500 hover:text-red-600 cursor-pointer size-5 max-md:size-3 "
          />
        </div>
        <span></span>
      </div>
    </>
  );
};

export default ProductCart;
