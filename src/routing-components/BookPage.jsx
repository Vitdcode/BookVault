import { useLocation, useOutletContext } from "react-router-dom";
import CompletedStatus from "../functional-components/CompletedStatus";
import { FaCheck } from "react-icons/fa";

const BookPage = () => {
  const { books, setBooks } = useOutletContext();
  const location = useLocation();
  const bookData = location.state;
  const completedStatusIndex = books.findIndex((book) => book.id === bookData.id);
  const compeltedStatus = books[completedStatusIndex]?.bookCompleted;

  return (
    <div className="mt-10">
      <div className="relative w-fit">
        {compeltedStatus ? (
          <FaCheck className="absolute top-0 right-0 bg-base-300 rounded-2xl p-1" size={30} />
        ) : null}

        <img src={bookData.coverUrl} alt={bookData.title} />
      </div>
      <p>{bookData.description}</p>
      <CompletedStatus bookData={bookData} />
    </div>
  );
};

export default BookPage;
