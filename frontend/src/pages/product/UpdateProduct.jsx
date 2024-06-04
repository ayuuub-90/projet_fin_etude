import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IoMdClose } from "react-icons/io";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { useGetAllBrandsQuery } from "../../redux/api/brandApiSlice.js";
import { toast } from "react-toastify";
import Navigation from "../Navigation.jsx";
import { default_img } from "../../assets/assets.js";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: product } = useGetProductByIdQuery(params.id);
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category._id || "");
  const [countInStock, setCountInStock] = useState(product?.countInStock || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [image1, setImage1] = useState(product?.images.image1 || "");
  const [image2, setImage2] = useState(product?.images.image2 || "");
  const [image3, setImage3] = useState(product?.images.image3 || "");

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setBrand(product.brand._id);
      setCategory(product.category._id);
      setCountInStock(product.countInStock);
      setImage1(product.images.image1);
      setImage2(product.images.image2);
      setImage3(product.images.image3);
    }
  }, [product]);

  const handleUpload = async (e, imageNumber) => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        id: product._id,
        data: {
          name,
          description,
          price,
          brand,
          images: {
            image1,
            image2,
            image3,
          },
          category,
          countInStock,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`product updated successfully`);
        navigate("/admin");
        return;
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
            className="absolute top-3 right-3 text-gray-400 cursor-pointer size-3 max-md:hidden "
            onClick={() => navigate(-1)}
          >
            <IoMdClose />
          </div>
          <div className="bg-gray-100 h-full w-[430px] max-md:w-full">
            <div className="h-[430px] max-md:h-full max-md:pb-6 w-[430px] max-md:w-full flex justify-between items-center flex-col ">
              {image1 ? (
                <img
                  src={image1}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
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
                  handleUpload(e, 1);
                  setImage1((prevImage1) => {
                    return prevImage1;
                  });
                }}
                id="input-file1"
                hidden
              />

              <label
                htmlFor="input-file1"
                className="mt-2 bg-black text-white w-[250px] rounded hover:bg-gray-900 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 1
              </label>

              {image2 ? (
                <img
                  src={image2}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              ) : (
                <img
                  src={default_img}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              )}

              <label
                htmlFor="input-file2"
                className="mt-2 bg-black text-white w-[250px] rounded hover:bg-gray-900 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 2
              </label>

              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={(e) => handleUpload(e, 2)}
                id="input-file2"
                hidden
              />

              {image3 ? (
                <img
                  src={image3}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              ) : (
                <img
                  src={default_img}
                  className="h-[150px] w-[200px] transform transition duration-300 hover:scale-[1.02] mt-10 text-gray-300 object-contain"
                />
              )}

              <label
                htmlFor="input-file3"
                className="mt-2 bg-black text-white w-[250px] rounded hover:bg-gray-900 h-[30px] justify-center flex items-center cursor-pointer"
              >
                ADD IMAGE PRODUCT 3
              </label>

              <input
                type="file"
                name="image3"
                accept="image/*"
                onChange={(e) => handleUpload(e, 3)}
                id="input-file3"
                hidden
              />

            </div>
          </div>
          <div className="bg-white h-full w-[830px] max-md:w-full">
            <form className="m-6 mt-[3rem] max-md:m-4 max-md:text-sm" onSubmit={handleUpdate}>
              <h2 className="text-2xl max-md:text-xl font-medium mb-2">PRODUCT DETAILS</h2>

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
                className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <label className="text-gray-500">brand: *</label>
              <select
                type="text"
                placeholder="brand"
                className="w-[100%] h-[40px] mt-1 pl-2 outline-none bg-gray-100 rounded"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {brands?.map((brnd) => (
                  <option key={brnd._id} value={brnd._id}>
                    {brnd.name}
                  </option>
                ))}
              </select>

              <button
                className=" mt-6 bottom-[100px] bg-black text-white w-full rounded hover:bg-gray-900 h-[50px]"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
