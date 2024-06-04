import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
} from "../../redux/api/userApiSlice.js";
import { FaUserEdit, FaTrash, FaSave } from "react-icons/fa";

const AllUsers = () => {
  const { data: users, refetch } = useGetAllUsersQuery();

  const [idEdited, setIdEdited] = useState(null);
  const [isAdminEdited, setIsAdminEdited] = useState("");
  const [editable, setEditable] = useState(false);

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserById] = useUpdateUserByIdMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      if (confirm(`Are you sure you want to delete `)) {
        await deleteUser(id).unwrap();
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUserById({ isAdmin: isAdminEdited, id: id });
      refetch();
      setIdEdited(null);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleError = () => {
    if (isAdminEdited) {
      return toast.error("cannot change an Admin to Customer");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-medium mb-6 max-md:m-3">Customers</h2>
      <div className="h-[540px] overflow-auto ">
        <table className="w-full text-sm">
          <thead className="text-gray-700 my-4 bg-gray-50">
            <tr>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                Customer No
              </td>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                Full Name
              </td>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                Phone
              </td>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                Email
              </td>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                IsAdmin
              </td>
              <td className="font-semibold text-gray-600 px-4 py-2 text-left">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <td
                  className="font-semibold px-4 py-2 text-left text-gray-500"
                  title={user._id}
                >
                  #{user._id.slice(0, 10)}...
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {user.firstname} {user.lastname}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {user.phone}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {user.email}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  {user.isAdmin ? "Admin" : "Customer"}
                </td>

                <td className="font-semibold px-4 py-2 text-left">
                  <div className="flex">
                    {editable && idEdited === user._id ? (
                      <FaSave
                        className="mx-3 cursor-pointer text-gray-500 hover:text-black"
                        onClick={() => {
                          handleError(user._id);
                          handleUpdate(user._id);
                          setEditable(false);
                        }}
                        title="save changes"
                      />
                    ) : (
                      <FaUserEdit
                        className="mx-3 cursor-pointer text-gray-500 hover:text-black"
                        onClick={() => {
                          setIdEdited(user._id);
                          setIsAdminEdited(user.isAdmin);
                          setEditable(true);
                        }}
                        title={!user.isAdmin ? "Change to Admin" : ""}
                      />
                    )}
                    {!user.isAdmin ? (
                      <FaTrash
                        className="cursor-pointer text-gray-500 hover:text-red-600"
                        onClick={() => handleDelete(user._id)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
