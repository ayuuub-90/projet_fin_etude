import { useParams } from "react-router";

import Navigation from "../Navigation.jsx";
import { useGetProductByCategorieQuery } from "../../redux/api/productApiSlice";
import ProductCard2 from "./ProductCard2.jsx";
import Footer from "../Footer.jsx";

export default function ProductByCategory() {
  const { id } = useParams();
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
      <Navigation />
      <div className="mb-24 w-3/4 mx-auto">
        <div className="my-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight border-b pb-6">
            Products By Category
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {productsByCategory.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
          {productsByCategory.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
          {productsByCategory.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
          {productsByCategory.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
