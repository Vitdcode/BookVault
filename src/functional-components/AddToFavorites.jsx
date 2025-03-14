import { useOutletContext } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import toggleProperty from "./toggleProperty";
import { useEffect, useRef } from "react";

const AddToFavorites = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const isFavorite = books.find((book) => book.id === bookData.id)?.isFavorite || false;
  /*   const handleFavoritesToggle = (e) => {
    toggleProperty(books, setBooks, bookData, "isFavorite", "isCompleted", "isBookmarked", e);
    updateServerData(books);
  };
  useEffect(() => {
    updateServerData(books);
  }, [books]); */

  const handleFavoritesToggle = (e) => {
    const updatedBooks = toggleProperty(
      books,
      setBooks,
      bookData,
      "isFavorite",
      "isCompleted",
      "isBookmarked",
      e
    );
    updatedBooks;
    updateServerData(updatedBooks); // Call with the updated books
  };
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

const updateServerData = (books) => {
  if (books.length === 0) return;
  try {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books: books }),
    });
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};
