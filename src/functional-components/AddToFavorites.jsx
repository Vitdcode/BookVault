import { useOutletContext } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

const AddToFavorites = ({ bookData }) => {
  const { favorites, setFavorites } = useOutletContext();
  const isFavorite = favorites.some((book) => book.id === bookData.id);

  const handleFavoritesToggle = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((book) => book.id != bookData.id));
    } else {
      setFavorites([...favorites, bookData]);
    }
  };

  const icons = {
    favorite: (
      <MdOutlineFavorite
        onClick={handleFavoritesToggle}
        size={30}
        className="hover:cursor-pointer"
      />
    ),
    notFavorite: (
      <MdOutlineFavoriteBorder
        onClick={handleFavoritesToggle}
        size={30}
        className="hover:cursor-pointer"
      />
    ),
  };

  return (
    <div className="hover:cursor-pointer hover:bg-base-300 p-2 rounded-full transition duration-300 ease-in-out">
      {isFavorite ? icons.favorite : icons.notFavorite}
    </div>
  );
};

export default AddToFavorites;
