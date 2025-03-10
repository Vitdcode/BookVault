import { useOutletContext } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import toggleProperty from "./toggleProperty";

const CompletedStatus = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const isCompleted = books.find((book) => book.id === bookData.id)?.isCompleted || false;

  const handleReadingStatus = (e) =>
    toggleProperty(books, setBooks, bookData, "isCompleted", "isFavorite", "isBookmarked", e);

  return (
    <button className="btn btn-primary" onClick={(e) => handleReadingStatus(e)}>
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
