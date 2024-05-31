import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ProgressSteps from "../../components/ProgressSteps";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shipping_address.address) {
      navigate("/shipping");
    }
  }, [cart.shipping_address.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        order_items: cart.cartItems,
        shipping_address: cart.shipping_address,
        payment_infos: cart.payment_infos,
        items_price: cart.items_price,
        shipping_price: cart.shipping_price,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 step4 />

      <div className="container mx-auto mt-20">
       {/*  <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-1 py-2 text-left">Image</th>
                <th className="px-1 py-2 text-left">Product</th>
                <th className="px-1 py-2 text-left">Quantity</th>
                <th className="px-1 py-2 text-left">Price</th>
                <th className="px-1 py-2 text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 ">
                    <img
                      src={item.images.image1}
                      alt={item.name}
                      className="object-contain size-20 "
                    />
                  </td>

                  <td className="p-2">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">$ {item.price.toFixed(2)}</td>
                  <td className="p-2">
                    $ {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left">Image</th>
        <th className="px-4 py-2 text-left">Product</th>
        <th className="px-4 py-2 text-left">Quantity</th>
        <th className="px-4 py-2 text-left">Price</th>
        <th className="px-4 py-2 text-left">Total</th>
        <th className="px-4 py-2 text-left"></th> {/* Empty header for actions */}
      </tr>
    </thead>

    <tbody>
      {cart.cartItems.map((item, index) => (
        <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
         <td className="p-2 ">
                    <img
                      src={item.images.image1}
                      alt={item.name}
                      className="object-contain size-20 "
                    />
                  </td>

          <td className="p-2">
            <div className="text-gray-800 font-semibold">{item.name}</div>
          </td>
          <td className="p-2">
            <div className="text-gray-800">{item.quantity}</div>
          </td>
          <td className="p-2">
            <div className="text-gray-800">$ {item.price.toFixed(2)}</div>
          </td>
          <td className="p-2">
            <div className="text-gray-800">$ {(item.quantity * item.price).toFixed(2)}</div>
          </td>
          <td className="p-2">
            <button className="bg-gray-800 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded shadow">
              View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="4" className="border-t px-4 py-2"></td>
        <td className="border-t px-4 py-2 font-bold">Total:</td>
        <td className="border-t px-4 py-2 font-bold">
          $ {cart.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}
        </td>
      </tr>
    </tfoot>
  </table>
</div>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 text-gray-600 ">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> ${" "}
                {cart.items_price}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> ${" "}
                {Number(cart.shipping_price)}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> ${" "}
                {cart.totalPrice}
              </li>
            </ul>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart?.shipping_address?.address},{" "}
                {cart.shipping_address.city}, {cart.shipping_address.country},{" "}
                {cart.shipping_address.postalCode}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.payment_infos.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-gray-800 text-white py-2 px-4 rounded text-lg w-full mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
