import { useOutletContext } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import toggleProperty from "./toggleProperty";

const AddToFavorites = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const isFavorite = books.find((book) => book.id === bookData.id)?.isFavorite || false;

  const handleFavoritesToggle = (e) =>
    toggleProperty(books, setBooks, bookData, "isFavorite", "isCompleted", "isBookmarked", e);

  const icons = {
    favorite: (
      <MdOutlineFavorite
        onClick={(e) => handleFavoritesToggle(e)}
        size={30}
        className="hover:cursor-pointer"
        color="rgb(187, 85, 85)"
      />
    ),
    notFavorite: (
      <MdOutlineFavoriteBorder
        onClick={(e) => handleFavoritesToggle(e)}
        size={30}
        className="hover:cursor-pointer"
      />
    ),
  };

  return (
    <div className="hover:cursor-pointer hover:bg-base-300 p-2 rounded-full transition duration-300 ease-in-out w-fit">
      {isFavorite ? icons.favorite : icons.notFavorite}
    </div>
  );
};

export default AddToFavorites;
