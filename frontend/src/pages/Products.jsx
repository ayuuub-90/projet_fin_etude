import { IoRefreshOutline } from "react-icons/io5";
import Navigation from "./Navigation.jsx";
import { useGetFiltersProductsQuery } from "../redux/api/productApiSlice.js";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice.js";
import ProductCard3 from "./product/ProductCard3.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Products = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { products, categories, checked, radio } = useSelector(
    (state) => state.shop
  );

  const { data: categoriesQuery, isLoading: loadingCategories } =
    useGetAllCategoriesQuery();

  const { data: filteredProducts, isLoading: loadingProducts } =
    useGetFiltersProductsQuery({ checked, radio });

  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (!loadingCategories) {
      dispatch(setCategories(categoriesQuery));
    }
  });

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!loadingProducts) {
        let filteredProductsQuery = filteredProducts;
        if (priceFilter !== "") {
          filteredProductsQuery = filteredProductsQuery.filter((product) => {
            return parseFloat(product.price) <= parseFloat(priceFilter);
          });
        }
        dispatch(setProducts(filteredProductsQuery));
      }
    }
  }, [
    checked,
    radio,
    filteredProducts,
    priceFilter,
    dispatch,
    loadingProducts,
  ]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1">
        <div className="bg-gray-100 w-1/4 border-r">
          <h1 className="px-6 py-4 font-bold text-lg">Filter</h1>
          <div className="border-t">
            <div className="px-6 py-4">
              <h2 className="font-medium mb-2">Filter By Category</h2>
              {categories?.map((category) => (
                <div key={category._id} className="flex items-center my-2">
                  <input
                    className="cursor-pointer mr-2"
                    type="checkbox"
                    name="cat"
                    id={category._id}
                    onChange={(e) =>
                      handleCheck(e.target.checked, category._id)
                    }
                  />
                  <label className="cursor-pointer" htmlFor={category._id}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="border-t px-6 py-4">
              <div className="border border-gray-200 p-4 rounded-lg shadow-md">
                <h2 className="font-medium mb-2 text-xl">Filter By Price</h2>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="form-range w-full mr-4"
                  />
                  <div className="text-gray-700">{priceFilter}</div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="flex items-center justify-center bg-gray-800 text-white w-full py-2 rounded"
                  onClick={() => {
                    setPriceFilter(""); // Réinitialiser le filtre de prix
                    dispatch(setChecked([])); // Réinitialiser les catégories sélectionnées
                  }}
                >
                  <IoRefreshOutline className="mr-2" /> Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white">
          <div className="sticky top-0 bg-white border-b-2">
            <h1 className="px-6 py-4 font-bold text-xl">
              {products?.length
                ? "Our Products"
                : "There Are No Products In Stock"}
            </h1>
            <div className="flex items-center mr-6">
              <input
                type="text"
                placeholder="Search products here..."
                className="border p-2 outline-none w-[300px] rounded"
                onChange={(e) => setSearch(e.target.value)}
                id="search-input"
              />
              <button
                className="border h-10 w-10 flex items-center justify-center bg-gray-800 text-white ml-2"
                onClick={() => document.getElementById("search-input").focus()}
              >
                <IoSearchSharp />
              </button>
            </div>
          </div>
          <div className="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              ?.filter((item) =>
                search.toLowerCase() === ""
                  ? true
                  : item.name.toLowerCase().includes(search)
              )
              .map((product) => (
                <ProductCard3 key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
