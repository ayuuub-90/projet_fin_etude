import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../pages/Navigation";
import { getCartFromLocalStorage } from "../../../utils/localStorageCart";
import ProductCart from "./ProductCart.jsx";
import { useEffect } from "react";
import { setCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    const products = getCartFromLocalStorage();
    dispatch(setCart(products));
  }, [dispatch]);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    userInfo
      ? cartItems.length
        ? navigate("/shipping")
        : ""
      : navigate("/login");
  };

  return (
    <>
      <Navigation />
 
      <div className="mr-2 ml-32 my-6 max-md:m-2">
        <div className="flex justify-between max-md:mb-2 mb-6">
          <h1 className="font-bold text-2xl tracking-wider max-md:text-lg">
            Shopping Cart
          </h1>
          <h1 className="mr-6 max-md:mr-1 font-medium flex items-center">
            {cartItems.length} ITEMS
          </h1>
        </div>
        <hr />
        <div className=" w-full h-full flex flex-wrap max-md:flex-col">
          <div className="w-[70%] max-md:w-full">
            {cartItems.length === 0 ? (
              <>
                <div className="max-md:center max-md:text-sm p-2">Your cart is empty</div>
              </>
            ) : (
              cartItems.map((product) => (
                <ProductCart
                  className="border"
                  key={product._id}
                  product={product}
                />
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="bg-gray-50 w-[29%] max-md:w-full min-h-[81vh] max-md:min-h-[200px] sticky my-2 flex justify-between flex-col">
                <div className="w-full p-4 pt-8 max-md:pt-4">
                  <span className="text-2xl max-md:text-lg font-bold tracking-wider">
                    Summary
                  </span>
                </div>
                <hr />
                <div className="h-[300px] max-md:h-auto gap-6 max-md:gap-2 p-4 max-md:text-sm text-xl font-medium flex flex-col text-gray-800">
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{Number(cart.shipping_price)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>0.00 $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SubTotal</span>
                    <span>{cart.totalPrice} $ </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between py-4">
                    <span className="font-medium text-xl  max-md:text-sm">Total </span>
                    <span className="font-bold text-2xl  max-md:text-sm">
                      {(Number(cart.totalPrice) + Number(cart.shipping_price)).toFixed(2)} $
                    </span>
                  </div>
                  <button
                    onClick={checkoutHandler}
                    className={` w-full h-16  max-md:h-10  max-md:text-xs text-white tracking-widest font-medium ${
                      !cartItems.length
                        ? "cursor-default bg-gray-300"
                        : "bg-gray-950"
                    } `}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;


