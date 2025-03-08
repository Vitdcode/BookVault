import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const AddToBookmarks = ({ bookData }) => {
  const { bookmarks, setBookmarks } = useOutletContext();
  const isBookmarked = bookmarks.some((book) => book.id === bookData.id);

  const handleBookmarksToggle = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((book) => book.id != bookData.id));
    } else {
      setBookmarks([...bookmarks, bookData]);
    }
  };

  const icons = {
    bookmarked: (
      <FaBookmark
        onClick={handleBookmarksToggle}
        size={28}
        className="hover:cursor-pointer hover:bg-base-300"
      />
    ),
    notBookmarked: (
      <FaRegBookmark
        onClick={handleBookmarksToggle}
        size={28}
        className="hover:cursor-pointer hover:bg-base-300"
      />
    ),
  };

  return (
    <div className="hover:cursor-pointer hover:bg-base-300 p-2 rounded-full transition duration-300 ease-in-out">
      {isBookmarked ? icons.bookmarked : icons.notBookmarked}
    </div>
  );
};

export default AddToBookmarks;
