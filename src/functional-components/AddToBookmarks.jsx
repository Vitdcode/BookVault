import { useOutletContext } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import toggleProperty from "./toggleProperty";
import updateServerData from "../backend-json/updateServerData";

const AddToBookmarks = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();

  // Check if the book is in the persistent books state and bookmarked
  const isBookmarked = books.find((book) => book.id === bookData.id)?.isBookmarked || false;

  const handleBookmarksToggle = (e) => {
    const updatedBooks = toggleProperty(
      books,
      setBooks,
      bookData,
      "isBookmarked",
      "isCompleted",
      "isFavorite",
      e
    );
    updateServerData(updatedBooks);
  };

  const icons = {
    bookmarked: (
      <FaBookmark
        onClick={(e) => handleBookmarksToggle(e)}
        size={28}
        className="hover:cursor-pointer hover:bg-base-300"
        color="rgb(43, 127, 255)"
      />
    ),
    notBookmarked: (
      <FaRegBookmark
        onClick={(e) => handleBookmarksToggle(e)}
        size={28}
        className="hover:cursor-pointer hover:bg-base-300"
      />
    ),
  };

  return (
    <div className="hover:cursor-pointer hover:bg-base-300 p-2 rounded-full transition duration-300 ease-in-out w-fit">
      {isBookmarked ? icons.bookmarked : icons.notBookmarked}
    </div>
  );
};

export default AddToBookmarks;
