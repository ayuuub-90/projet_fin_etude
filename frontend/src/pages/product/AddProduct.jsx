import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { useGetAllBrandsQuery } from "../../redux/api/brandApiSlice.js";
import { useNavigate } from "react-router";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import Navigation from "../Navigation.jsx";
import { default_img } from "../../assets/assets.js";

const AddProduct = () => {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const handleUploadImageProduct = async (e, imageNumber) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      if (imageNumber === 1) {
        setImage1(res.image);
      } else if (imageNumber === 2) {
        setImage2(res.image);
      } else if (imageNumber === 3) {
        setImage3(res.image);
      }
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct({
        name,
        description,
        price,
        category,
        countInStock,
        brand,
        images: {
          image1,
          image2,
          image3,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} created successfully`);
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center h-[96vh] max-md:h-auto">
        <div className="relative w-[1250px] max-md:w-full flex flex-row max-md:flex-col h-[700px] bg-white rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-md:shadow-none">
          <div
            className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 max-md:hidden"
            onClick={() => navigate(-1)}
          >
            <IoMdClose />
          </div>
          <div className="bg-gray-100 h-full w-[430px] max-md:w-full">
            <div className="h-[430px] max-md:h-full max-md:pb-6 w-[430px] max-md:w-full flex justify-between items-center flex-col ">
              {image1 ? (
                <img
                  src={image1}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300"
                />
              ) : (
                <img
                  src={default_img}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              )}

              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={(e) => {
                  handleUploadImageProduct(e, 1);
                  setImage1((prevImage1) => {
                    return prevImage1;
                  });
                }}
                id="input-file1"
                hidden
              />

              <label
                htmlFor="input-file1"
                className="mt-4 bg-gray-300 text-black w-[200px] rounded hover:bg-gray-400 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 1
              </label>

              {image2 ? (
                <img
                  src={image2}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300"
                />
              ) : (
                <img
                  src={default_img}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              )}

              <label
                htmlFor="input-file2"
                className="mt-4 bg-gray-300 text-black w-[200px] rounded hover:bg-gray-400 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 2
              </label>

              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={(e) => handleUploadImageProduct(e, 2)}
                id="input-file2"
                hidden
              />

              {image3 ? (
                <img
                  src={image3}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300"
                />
              ) : (
                <img
                  src={default_img}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              )}

              <label
                htmlFor="input-file3"
                className="mt-4 bg-gray-300 text-black w-[200px] rounded hover:bg-gray-400 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 3
              </label>

              <input
                type="file"
                name="image3"
                accept="image/*"
                onChange={(e) => handleUploadImageProduct(e, 3)}
                id="input-file3"
                hidden
              />
            </div>
          </div>
          
          <div className="bg-white h-full w-[830px] max-md:w-full">
            <form className="m-6 mt-[3rem] max-md:m-4 max-md:text-sm" onSubmit={handleAdd}>
              <h2 className="text-2xl max-md:text-xl font-medium mb-2 max-md:mb-4">PRODUCT DETAILS</h2>

              <label className="text-gray-500">product name: *</label>
              <input
                type="text"
                placeholder="product name"
                className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="text-gray-500">description: *</label>
              <textarea
                rows="3"
                type="text"
                placeholder="description"
                className="w-[100%] mt-1 pl-2 outline-none bg-gray-100 rounded resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label className="text-gray-500">price: *</label>
              <input
                type="number"
                placeholder="price"
                className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <label className="text-gray-500">count in stock: *</label>
              <input
                type="number"
                placeholder="count in stock"
                className="w-[100%] h-[40px] mt-1 pl-2 
              outline-none bg-gray-100 rounded"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />

              <label className="text-gray-500">category: *</label>
              <select
                type="text"
                placeholder="category"
                className="w-[100%] h-[40px] mt-1 px-2 outline-none bg-gray-100 rounded text-gray-600"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" defaultValue={""} disabled>
                  --select category--
                </option>

                {categories?.map((ctg) => (
                  <option key={ctg._id} value={ctg._id}>
                    {ctg.name}
                  </option>
                ))}
              </select>

              <label className="text-gray-500">brand: *</label>
              <select
                type="text"
                placeholder="brand"
                className="w-[100%] h-[40px] mt-1 px-2 outline-none bg-gray-100 rounded text-gray-600"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="" defaultValue={""} disabled>
                  --select brand--
                </option>

                {brands?.map((brnd) => (
                  <option key={brnd._id} value={brnd._id}>
                    {brnd.name}
                  </option>
                ))}
              </select>

              <button
                className=" mt-16 bottom-[100px] bg-black max-md:text-xs text-white w-full rounded hover:bg-gray-900 h-[50px]"
                onClick={handleAdd}
              >
                CREATE NEW PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
