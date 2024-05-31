import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import {
  useEditPubMutation,
  useGetPubByIdQuery,
} from "../../redux/api/pubApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import Navigation from "../Navigation.jsx"

const UpdatePub = () => {
  const params = useParams();
  const [editPub] = useEditPubMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: pub } = useGetPubByIdQuery(params.id);
  const { data: categories } = useGetAllCategoriesQuery();

  const [title, setTitle] = useState(pub?.title || "");
  const [subTitle, setSubTitle] = useState(pub?.subTitle || "");
  const [category, setCategory] = useState(pub?.category || "");
  const [image, setImage] = useState(pub?.image || "");

  const navigate = useNavigate();
  const closeProfile = () => {
    navigate(-1);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (pub && pub._id) {
      setTitle(pub.title);
      setSubTitle(pub.subTitle);
      setCategory(pub.category);
      setImage(pub.image);
    }
  }, [pub]);

  const handleUpdate = async () => {
    try {
      const res = await editPub({
        id: pub._id,
        data: {
          title,
          subTitle,
          category,
          image,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`product updated successfully`);
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
      <>
       <Navigation />
        <div className="flex justify-center items-center h-[96vh]">
          <div className="relative w-[1050px] flex flex-row h-[700px] bg-white rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] ">
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 "
              onClick={closeProfile}
            >
              <IoMdClose />
            </div>
            <div className="bg-gray-100 h-full w-[430px]">
              <div className="h-[430px] w-[430px] flex justify-between items-center flex-col ">
                {image ? (
                  <img
                    src={image}
                    className="h-[300px] w-[300px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-cover"
                  />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2hfBadbN0vYkhw9xn4BSxibyfEVTinJLa5XYGyUAOXZl5eBxXpbCaZpFENwRkcjS2WRM&usqp=CAU"
                    className="h-[300px] w-[300px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-cover"
                  />
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleUpload}
                  id="input-file"
                  hidden
                />
                <label
                  htmlFor="input-file"
                  className="mt-10 bg-black text-white w-[300px] rounded hover:bg-gray-900 h-[50px] justify-center flex items-center cursor-pointer"
                >
                  CHANGE IMAGE PUB
                </label>
                <button
                  className="absolute bottom-[100px] bg-black text-white w-[300px] rounded hover:bg-gray-900 h-[50px]"
                  onClick={handleUpdate}
                >
                  UPDATE PUB
                </button>
              </div>
            </div>
            <div className="bg-white h-full w-full ">
              <form className="m-6 mt-[3rem]" onSubmit={handleUpdate}>
                <h2 className="text-2xl font-medium mb-6 ">PUB DETAILS</h2>

                <label className="text-gray-500">pub title: *</label>
                <input
                  type="text"
                  placeholder="pub title"
                  className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label className="text-gray-500">sub title: *</label>
                <textarea
                  rows="4"
                  type="text"
                  placeholder="sub title"
                  className="w-[100%] mt-1 pl-2 pt-1 outline-none bg-gray-100 rounded resize-none"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                ></textarea>

                <label className="text-gray-500">category: *</label>
                <select
                  type="text"
                  placeholder="category"
                  className="w-[100%] h-[40px] mt-1 px-2 outline-none bg-gray-100 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" defaultValue={""} disabled>
                    --select category--
                  </option>

                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};

export default UpdatePub;
