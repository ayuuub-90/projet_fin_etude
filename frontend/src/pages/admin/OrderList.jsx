import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders } = useGetAllOrdersQuery();

  return (
    <>
      <h2 className="text-2xl font-medium mb-6 max-md:m-3">Orders</h2>
      <div className="h-[540px] overflow-auto ">
        <table className="w-full max-md:text-sm">
          <thead className="text-gray-700 my-4 bg-gray-50">
            <tr>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                ITEMS
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                ID
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                USER
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                DATE
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                TOTAL
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-center">
                PAID
              </th>
              <th className="font-semibold text-gray-600 px-4 py-2 text-left">
                DELIVERED
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <td>
                  <img
                    src={order.order_items[0].images.image1}
                    alt={order._id}
                    className="size-20 object-contain pt-4"
                  />
                </td>
                <td className="font-semibold px-4 py-2 text-left text-gray-500">
                  {order._id}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {order.user
                    ? order.user.firstname + " " + order.user.lastname
                    : "N/A"}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  $ {order.totalPrice.toFixed(2)}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {order.status.is_paid ? (
                    <p className="p-1 text-center bg-green-800 text-white w-[7rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 text-white w-[7rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {order.status.is_livred ? (
                    <p className="p-1 text-center bg-green-800 text-white w-[7rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 text-white w-[7rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  <Link to={`/order/${order._id}`}>
                    <button>More</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
