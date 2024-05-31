import { useGetNewProductsQuery } from "../redux/api/productApiSlice";
import ProductCard2 from "./product/ProductCard2.jsx";

const NewArrivals = () => {
  const { data: arrivals } = useGetNewProductsQuery();

  return (
    <div className="mt-10 mb-25 p-10 max-md:my-1 max-md:p-2 w-full mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight ">
            Discover Our Latest Products
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Explore our newest arrivals and find your next favorite item.
          </p>
        </div>
        <div className="center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {arrivals?.map((arrival) => (
            <ProductCard2 key={arrival._id} product={arrival} />
          ))}
        </div>
        </div>
    </div>
  );
}

export default NewArrivals;