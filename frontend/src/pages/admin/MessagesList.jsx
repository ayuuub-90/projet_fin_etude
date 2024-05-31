import moment from "moment";
import {
  useGetAllMessagesQuery,
  useDeleteMessageMutation,
} from "../../redux/api/messageApiSlice.js";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MessagesList = () => {
  const { data: messages, refetch } = useGetAllMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async (id) => {
    try {
      if (confirm(`Are you sure you want to delete this message`)) {
        await deleteMessage(id);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-medium mb-6">Reclamations</h2>
      <div className="h-[430px] overflow-hidden overflow-y-auto">
        {!messages?.length ? (
          <>
            <div className="font-medium text-xl text-gray-700 text-center">
              there is no reclamations right now
            </div>
          </>
        ) : (
          <table className="w-full">
            <thead className="text-gray-700 my-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Reclamation No
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Full name
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Email
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Reason
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Content
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Date
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Delete
                </td>
              </tr>
            </thead>
            <tbody>
              {messages?.map((message) => (
                <tr
                  key={message._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800"
                >
                  <td
                    className="font-semibold px-4 py-2 text-left text-gray-500"
                    title={message._id}
                  >
                    #{message._id.slice(0, 10)}...
                  </td>
                  <td className="font-semibold px-4 py-2 text-left">
                    {message.firstname + " " + message.lastname}
                  </td>
                  <td className="font-semibold px-4 py-2 text-left">
                    {message.email}
                  </td>
                  <td className="font-semibold px-4 py-2 text-left">
                    {message.reason}
                  </td>
                  <td
                    className="font-semibold px-4 py-2 text-left"
                    title={message.content}
                  >
                    {message.content.slice(0, 12)}...
                  </td>
                  <td className="font-semibold px-4 py-2 text-left">
                    {moment(message.createdAt).fromNow()}
                  </td>
                  <td>
                    <FaTrash
                      onClick={() => handleDelete(message._id)}
                      className="cursor-pointer text-gray-500 hover:text-red-600 text-right w-[100px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MessagesList;
