import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../utils/localStorageFavorite.js";
import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites?.some((p) => p._id === product._id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  return (
    <div onClick={toggleFavorite}>
      {isFavorite ? (
        <FaHeart className="absolute p-0 m-0 top-5 right-5 text-pink-600 cursor-pointer" />
      ) : (
        <FaRegHeart className="absolute p-0 m-0 top-5 right-5 text-black cursor-pointer" />
      )}
    </div>
  );
};

export default HeartIcon;
