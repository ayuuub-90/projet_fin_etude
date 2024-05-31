import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const count = favorites.length;

  return (
    <div>
      {count > 0 && (
        <span className="absolute rounded-full top-2 text-sm bg-pink-600 text-white px-[8px] ">
          {count}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
