import { useOutletContext } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import toggleProperty from "./toggleProperty";
import { motion } from "framer-motion";
import bookApis from "../api";
import { BsFillPatchCheckFill } from "react-icons/bs";

const CompletedStatus = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const isCompleted =
    books.find((book) => book.googleBooksId === bookData.googleBooksId)?.isCompleted || false;

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
      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: new Date().getFullYear() } : book
      );
    } else {
      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: "" } : book
      );
    }

    const updatedBook = updatedBooks.find((book) => book.googleBooksId === bookData.googleBooksId);
    bookApis.updateProperty(updatedBook.googleBooksId, "yearCompleted", updatedBook.yearCompleted);
  };

  return (
    <button className="btn btn-primary py-5 relative" onClick={(e) => handleReadingStatus(e)}>
      {isCompleted ? (
        <>
          Book completed{" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[-20%] left-[-5%]"
          >
            <BsFillPatchCheckFill size={25} color="rgb(110, 198, 154)" />
          </motion.div>
        </>
      ) : (
        "Mark completed"
      )}
    </button>
  );
};

export default CompletedStatus;
