import { useOutletContext } from "react-router-dom";

const CompletedStatus = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const completedStatusIndex = books.findIndex((book) => book.id === bookData.id);
  const compeltedStatus = books[completedStatusIndex]?.bookCompleted;

  const handleReadingStatus = () => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookData.id ? { ...book, bookCompleted: !book.bookCompleted } : book
      )
    );
  };

  return (
    <button className="btn btn-primary" onClick={handleReadingStatus}>
      {compeltedStatus ? "Unmark completed" : "Mark completed"}
    </button>
  );
};

export default CompletedStatus;
