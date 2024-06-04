/* eslint-disable react/prop-types */

import { useGetProductByCategorieQuery } from "../../redux/api/productApiSlice";
import ProductCard3 from "./ProductCard3.jsx";

export default function ProductLike({ id }) {
  const {
    data: productsByCategory,
    isLoading,
    isError,
  } = useGetProductByCategorieQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  if (!productsByCategory || productsByCategory.length === 0) {
    return <div>No products available for this category</div>;
  }

  return (
    <>
      <div className="container mx-auto max-md:w-full">
        <div className="text-center my-8 max-md:mb-3 max-md:mx-2">
          <h1 className="text-left w-[653px] max-md:w-full font-medium text-2xl pb-4 max-md:mt-4">
            Similaires products
          </h1>
        </div>
        <div className="grid max-md:flex max-md:w-full max-md:overflow-auto max-md:px-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {productsByCategory.map((product) => (
            <ProductCard3 key={product._id} product={product} />
          ))}
          {productsByCategory.map((product) => (
            <ProductCard3 key={product._id} product={product} />
          ))}
          {productsByCategory.map((product) => (
            <ProductCard3 key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
