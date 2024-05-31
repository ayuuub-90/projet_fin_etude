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
      <div className="container mx-auto">
        <div className="text-center my-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Produits Similaires
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {productsByCategory.map((product) => (
            <ProductCard3 key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
