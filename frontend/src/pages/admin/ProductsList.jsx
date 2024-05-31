import { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice.js";
import Product from "../product/Product.jsx";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductsList = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const { data: products, refetch } = useGetAllProductsQuery();

  let size = 0;
  for (let i in products) {
    size++;
    i;
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [isOpened, setIsOpened] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        setProductId(null);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-medium mb-4">Products</h2> <hr />
      <div
        className="h-[500px] overflow-hidden overflow-y-auto"
        onClick={() => {
          isOpened ? setIsOpened(false) : "";
        }}
      >
        <p className="font-medium mt-2">Products ({size})</p>
        {!products?.length ? (<><div className="font-medium text-xl text-gray-700 text-center">
                there is no products right now, <b>CREATE ONE</b>
              </div></>) : (<div className=" mb-10 mt-4 ">
          {products?.map((product) => (
            <div key={product._id} className="flex">
              <Product product={product} />
              <div
                className="relative flex items-center justify-center hover:bg-gray-50 text-gray-600 cursor-pointer w-[50px] "
                onClick={() => {
                  setIsOpened(!isOpened);
                  setProductId(product._id);
                }}
              >
                <CgDetailsMore />
                {isOpened && productId === product._id && (
                  <>
                    <div className="absolute bg-white rounded top-0 right-[30px] w-[180px] h-[80px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                      <div className="flex flex-col border h-full">
                        <Link
                          to={`update-product/${product._id}`}
                          className="h-[50%] flex items-center pl-2 hover:bg-gray-50 font-medium"
                        >
                          UPDATE PRODUCT
                        </Link>
                        <Link
                          className="h-[50%] flex items-center pl-2 hover:bg-gray-50 font-medium"
                          onClick={() => {
                            handleDelete(productId);
                          }}
                        >
                          DELETE PRODUCT
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>)}
        
      </div>
      <Link to={"add-product"} className="mt-4">
        <button className="bg-black text-white w-[200px] mt-4 rounded hover:bg-gray-900 h-[40px]">
          Create New Product
        </button>
      </Link>
    </>
  );
};

export default ProductsList;
