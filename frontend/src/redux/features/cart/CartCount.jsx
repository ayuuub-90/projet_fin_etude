import { useSelector } from "react-redux";

const CartCount = () => {
  const cart = useSelector((state) => state.cart);
  const count = cart.cartItems.length;

  return (
    <div>
      {count > 0 && (
        <span className="absolute rounded-full top-2 text-sm bg-pink-600 text-white px-[8px] ">
          {count}
        </span>
      )}
    </div>
  );
}

export default CartCount