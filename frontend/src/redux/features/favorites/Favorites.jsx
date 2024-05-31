import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../pages/Navigation.jsx";
import ProductCard2 from "../../../pages/product/ProductCard2.jsx";
import { getFavoritesFromLocalStorage } from "../../../utils/localStorageFavorite.js";
import { useEffect } from "react";
import { setFavorites } from "./favoriteSlice.js";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const favoritesFromLS = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLS));
  }, [dispatch]);

  return (
    <div>
      <Navigation />

      <div className="mr-2 ml-32 my-6 max-md:m-2">
        <h1 className="font-bold text-2xl mb-6 max-md:mb-2 max-md:text-lg">Favorites</h1>
        <hr />

        {favorites.length === 0 ? (
          <div className="max-md:center max-md:text-sm p-2">
            You don{"'"}t have any favorites products yet
          </div>
        ) : (
          <div className=" w-full h-full flex flex-wrap gap-4 center mt-4 mb-10">
            {favorites.map((product) => (
              <ProductCard2
                className="border"
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
