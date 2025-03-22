import { useOutletContext } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import toggleProperty from "./toggleProperty";
import { motion } from "framer-motion";

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
      updatedBooks;

      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: currentYear } : book
      );
    } else {
      updatedBooks = updatedBooks.map((book) =>
        book.id === bookData.id ? { ...book, yearCompleted: "" } : book
      );
    }
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
            <FaCircleCheck size={25} color="rgb(110, 198, 154)" />
          </motion.div>
        </>
      ) : (
        "Mark completed"
      )}
    </button>
  );
};

export default CompletedStatus;
