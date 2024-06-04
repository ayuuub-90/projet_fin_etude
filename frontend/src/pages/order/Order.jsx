import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  // useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useMarkOrderAsDelivredMutation,
  useMarkOrderAsPaidMutation,
} from "../../redux/api/orderApiSlice.js";
import Navigation from "../Navigation.jsx";
import { useEffect } from "react";

const Order = () => {
  const { id: orderId } = useParams();

  const { data: orders, refetch } = useGetOrderByIdQuery(orderId);

  if (orders?.length > 0) {
    var order = orders[0];
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [markOrderAsPaid] = useMarkOrderAsPaidMutation();
  const payOrder = async () => {
    try {
      await markOrderAsPaid({ id: orderId, data: order });
      toast.success("Order Paid Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder] = useMarkOrderAsDelivredMutation();
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Paid Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

return (
    <>
    <Navigation />
      <div className="text-3xl max-md:text-xl font-bold tracking-wider ml-[10rem] max-md:mx-4 my-5">
        Order Details
      </div>
      <hr />
      <div className="container flex flex-col ml-[10rem] max-md:mx-1 md:flex-row">
        <div className="md:w-2/3 pr-4">
          <div className="mt-5 max-md:mt-1 pb-4 mb-5 shadow-lg">
            {order?.order_items.length === 0 ? (
              <label>Order is empty</label>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-[80%] max-md:w-full max-md:text-sm">
                  <thead className="">
                    <tr>
                      <th className="p-2">Image</th>
                      <th className="p-2">Product</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2">Unit Price</th>
                      <th className="p-2">Total</th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {order?.order_items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 text-center center">
                          <img
                            src={item.images.image1}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                        </td>

                        <td className="p-2 text-center">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </td>

                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">
                          $ {item.price.toFixed(2)}
                        </td>
                        <td className="p-2 text-center">
                          $ {(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 shadow-md p-4 max-md:text-sm">
          <div className="mt-5 border-gray-300 pb-4 mb-4 max-md:text-sm">
            <h2 className="text-xl font-bold mb-2">Shipping</h2>
            <p className="mb-4 mt-4">
              <strong className="">Order:</strong> {order?._id}
            </p>

            <p className="mb-4">
              <strong className="">Name:</strong> {order?.user.firstname}{" "}
              {order?.user.lastname}
            </p>

            <p className="mb-4">
              <strong className="">Email:</strong> {order?.user.email}
            </p>

            <p className="mb-4">
              <strong className="">Address:</strong>{" "}
              {order?.shipping_address.address}, {order?.shipping_address.city}{" "}
              {order?.shipping_address.postalCode},{" "}
              {order?.shipping_address.country}
            </p>

            <p className="mb-4">
              <strong className="">Phone:</strong> {order?.shipping_address.phone}
            </p>

            <p className="mb-4">
              <strong className="">Method:</strong>{" "}
              {order?.payment_infos.paymentMethod}
            </p>

            {order?.status.is_paid ? (
              <div className="bg-green-50 w-full py-2 px-2 mt-2">
                Paid on {order?.status.paid_at}
              </div>
            ) : (
              <div className="bg-red-50 w-full py-2 px-2 mt-2">Not paid</div>
            )}
          </div>

          <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <strong>Items</strong>
            <span>$ {order?.items_price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <strong>Shipping</strong>
            <span>$ {order?.shipping_price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <strong>Total</strong>
            <span>$ {order?.totalPrice}</span>
          </div>

          {!order?.status.is_paid && (
            <button
              className="bg-yellow-500 font-bold w-full py-2 px-2 mt-2"
              onClick={payOrder}
            >
              PAY ORDER
            </button>
          )}

          {userInfo &&
            userInfo.isAdmin &&
            order?.status.is_paid &&
            !order?.status.is_livred && (
              <div>
                <button
                  type="button"
                  className="bg-yellow-500 text-white w-full py-2 mt-2"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  ); 
  
//   return (
//     <>
//       <div className="text-3xl font-bold tracking-wider ml-[10rem] my-5 text-gray-800">
//       Order Details
//     </div>
//     <div className="container flex flex-col ml-[10rem] md:flex-row">
//       <div className="md:w-2/3 pr-4">
//         <div className="mt-5 pb-4 mb-5 shadow-lg overflow-hidden rounded-lg">
//           {order?.order_items.length === 0 ? (
//             <div className="p-4 bg-gray-100">
//               <label className="text-xl text-gray-600">Order is empty</label>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="px-4 py-2 text-left">Image</th>
//                     <th className="px-4 py-2 text-left">Product</th>
//                     <th className="px-4 py-2 text-left">Quantity</th>
//                     <th className="px-4 py-2 text-left">Price</th>
//                     <th className="px-4 py-2 text-left">Total</th>
//                     <th className="px-4 py-2 text-left"></th> {/* Empty header for actions */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.order_items.map((item, index) => (
//                     <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
//                       <td className="p-2">
//                         <img
//                           src={item.images.image1}
//                           alt={item.name}
//                           className="object-contain size-20"
//                         />
//                       </td>
//                       <td className="p-2">
//                         <div className="text-gray-800 font-semibold">{item.name}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-gray-800">{item.quantity}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-gray-800">$ {item.price.toFixed(2)}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-gray-800">$ {(item.quantity * item.price).toFixed(2)}</div>
//                       </td>
//                       <td className="p-2">
//                         <button className="bg-gray-800 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded shadow">
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="container mx-auto px-4 md:w-1/2">
//   <div className="bg-white shadow-md rounded-lg p-6">
//     <h2 className="text-xl font-bold mb-4 text-gray-800">Shipping Details</h2>
//     <div className="border-b border-gray-300 mb-4 pb-4">
//       <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order?._id}</p>
//       <p className="text-gray-700 mb-2"><strong>Name:</strong> {order?.user.firstname} {order?.user.lastname}</p>
//       <p className="text-gray-700 mb-2"><strong>Email:</strong> {order?.user.email}</p>
//       <p className="text-gray-700 mb-2"><strong>Address:</strong> {order?.shipping_address.address}, {order?.shipping_address.city} {order?.shipping_address.postalCode}, {order?.shipping_address.country}</p>
//       <p className="text-gray-700 mb-2"><strong>Phone:</strong> {order?.shipping_address.phone}</p>
//       <p className="text-gray-700 mb-2"><strong>Payment Method:</strong> {order?.payment_infos.paymentMethod}</p>
//     </div>
  
//     <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
//     <div className="border-b border-gray-300 mb-4 pb-4">
//       <div className="flex justify-between mb-2">
//         <span className="text-gray-700"><strong>Items</strong></span>
//         <span className="text-gray-800">$ {order?.items_price}</span>
//       </div>
//       <div className="flex justify-between mb-2">
//         <span className="text-gray-700"><strong>Shipping</strong></span>
//         <span className="text-gray-800">$ {order?.shipping_price}</span>
//       </div>
//       <div className="flex justify-between mb-2">
//         <span className="text-gray-700"><strong>Total</strong></span>
//         <span className="text-gray-800">$ {order?.totalPrice}</span>
//       </div>
//     </div>
  
//     {!order?.status.is_paid && (
//       <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mb-4 focus:outline-none focus:shadow-outline" onClick={payOrder}>
//         PAY ORDER
//       </button>
//     )}
  
//     {userInfo && userInfo.isAdmin && order?.status.is_paid && !order?.status.is_livred && (
//       <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={deliverHandler}>
//         Mark As Delivered
//       </button>
//     )}
//   </div>
// </div>

//       </div>
//     </>
//   );
  

};

export default Order;
