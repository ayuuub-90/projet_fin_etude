import { toast } from "react-toastify";
import moment from "moment";
import {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "../../redux/api/brandApiSlice.js";
import { useUploadProductImageMutation } from "../../redux/api/productApiSlice.js";
import { useEffect, useState } from "react";
import { FaSave, FaTrash, FaUserEdit } from "react-icons/fa";

const BrandsList = () => {
  const { data: brands, refetch } = useGetAllBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [editable, setEditable] = useState(false);

  const [idEdited, setIdEdited] = useState(null);
  const [nameEdited, setNameEdited] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreate = async () => {
    try {
      const res = await createBrand({ name, image }).unwrap();
      if (res.error) {
        return toast.error("error creating brand, Try again");
      }
      setName("");
      toast.success("brand created successfully");
      document.getElementById("hello").style.backgroundColor = "gray";
      document.getElementById("hello").innerHTML = "Set Image";
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm(`Are you sure you want to delete `)) {
        await deleteBrand(id).unwrap();
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateBrand({
        id: id,
        updatedBrand: { name: nameEdited },
      }).unwrap();

      toast.success("Brand updated successfully");
      setIdEdited(null);
      setNameEdited("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
      document.getElementById("hello").style.backgroundColor = "green";
      document.getElementById("hello").innerHTML = "image Added";
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <>
      <h2 className="text-2xl font-medium mb-6">Brands</h2>
      <div className=" my-10 flex">
        <input
          type="text"
          placeholder="enter brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mr-2 rounded-md w-full outline-none bg-gray-50"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleUpload}
          id="input-file"
          hidden
        />
        <label
          id="hello"
          htmlFor="input-file"
          className="w-[160px] text-center justify-center items-center mx-2 flex bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
        >
          Set Image
        </label>
        <button
          className="bg-black text-white w-[200px] rounded hover:bg-gray-800 "
          onClick={handleCreate}
        >
          Create Brand
        </button>
      </div>
      <div className="h-[430px] overflow-hidden overflow-y-auto">
        {!brands?.length ? (
          <>
            <div className="font-medium text-xl text-gray-700 text-center">
              there is no brand right now, <b> CREATE ONE</b>
            </div>
          </>
        ) : (
          <table className="w-full">
            <thead className="text-gray-700 my-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Brand No
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Brand Name
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Date Created
                </td>
                <td className="font-semibold text-gray-600 text-[20px] px-4 py-2 text-left">
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {brands?.map((brand) => (
                <tr
                  key={brand._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800"
                >
                  <td
                    className="font-semibold px-4 py-2 text-left text-gray-500"
                    title={brand._id}
                  >
                    #{brand._id.slice(0, 10)}...
                  </td>

                  <td className="font-semibold px-4 py-2 text-left w-[400px] focus-within:shadow-lg ">
                    {idEdited === brand._id && editable ? (
                      <input
                        type="text"
                        value={nameEdited}
                        onChange={(e) => setNameEdited(e.target.value)}
                        className="bg-transparent outline-none pl-2 text-gray-600"
                      />
                    ) : (
                      brand.name
                    )}
                  </td>

                  <td
                    className="font-semibold px-4 py-2 text-left"
                    title={brand.createdAt}
                  >
                    {moment(brand.createdAt).fromNow()}
                  </td>

                  <td className="font-semibold px-4 py-2 text-left">
                    <div className="flex">
                      {editable && idEdited === brand._id ? (
                        <FaSave
                          className="mx-3 cursor-pointer text-gray-500 hover:text-black"
                          onClick={() => {
                            handleUpdate(brand._id);
                            setEditable(false);
                          }}
                          title="save changes"
                        />
                      ) : (
                        <FaUserEdit
                          className="mx-3 cursor-pointer text-gray-500 hover:text-black"
                          onClick={() => {
                            setIdEdited(brand._id);
                            setEditable(true);
                            setNameEdited(brand.name);
                          }}
                          title="Change brand Name"
                        />
                      )}
                      {!brand.isAdmin ? (
                        <FaTrash
                          className="cursor-pointer text-gray-500 hover:text-red-600"
                          onClick={() => {
                            handleDelete(brand._id);
                          }}
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
        )}
      </div>
    </>
  );
};

export default BrandsList;
