import { useOutletContext } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import toggleProperty from "./toggleProperty";
import updateBookData from "../backend-json/updateServerData";

const CompletedStatus = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const isCompleted = books.find((book) => book.id === bookData.id)?.isCompleted || false;

  const handleReadingStatus = (e) => {
    let updatedBooks = toggleProperty(
      books,
      setBooks,
      bookData,
      "isCompleted",
      "isFavorite",
      "isBookmarked",
      e
    );

    if (!isCompleted) {
      const currentYear = new Date().getFullYear();
      console.log(updatedBooks);

      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: currentYear } : book
      );
    } else {
      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: "" } : book
      );
    }

    updateBookData(updatedBooks);
  };

  return (
    <button className="btn btn-primary py-5" onClick={(e) => handleReadingStatus(e)}>
      {isCompleted ? (
        <>
          Book completed <FaRegCircleCheck size={20} />
        </>
      ) : (
        "Mark completed"
      )}
    </button>
  );
};

export default CompletedStatus;
