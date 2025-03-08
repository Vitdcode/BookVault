import { useOutletContext } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";

const CompletedStatus = ({ bookData }) => {
  const { completedBooks, setCompletedBooks } = useOutletContext();
  const isCompleted = completedBooks.some((book) => book.id === bookData.id);

  const handleReadingStatus = () => {
    if (isCompleted) {
      setCompletedBooks(completedBooks.filter((book) => book.id != bookData.id));
    } else {
      setCompletedBooks([...completedBooks, bookData]);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleReadingStatus}>
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
