import { useOutletContext } from "react-router-dom";
import bookApis from "../api";

const Rating = ({ completedBook }) => {
  const { books, setBooks } = useOutletContext();

  const handleRatingChange = (e) => {
    let updatedRating;

    updatedRating = books.map((book) =>
      book.id === completedBook.id ? { ...book, rating: e.target.value } : book
    );
    completedBook;
    bookApis.updateProperty(completedBook.googleBooksId, "rating", e.target.value); //send data to sql server
    setBooks(updatedRating);
  };
  completedBook.isCompleted;

  return (
    <>
      <div
        className={`rating flex justify-center w-[100%] hover:bg-base-200 p-2 rounded-lg transition-opacity duration-300 ease-in-out ${
          completedBook.isCompleted ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleRatingChange}
      >
        <input
          type="radio"
          name={completedBook.title}
          className="mask mask-star-2 bg-orange-400 hover:bg-orange-500"
          aria-label="1 star"
          value={1}
          checked={Number(completedBook.rating) === 1} // Convert string to number for comparison
          readOnly
        />
        <input
          type="radio"
          name={completedBook.title}
          className="mask mask-star-2 bg-orange-400 hover:bg-orange-500"
          aria-label="2 stars"
          value={2}
          checked={Number(completedBook.rating) === 2}
          readOnly
        />
        <input
          type="radio"
          name={completedBook.title}
          className="mask mask-star-2 bg-orange-400 hover:bg-orange-500"
          aria-label="3 stars"
          value={3}
          checked={Number(completedBook.rating) === 3}
          readOnly
        />
        <input
          type="radio"
          name={completedBook.title}
          className="mask mask-star-2 bg-orange-400 hover:bg-orange-500"
          aria-label="4 stars"
          value={4}
          checked={Number(completedBook.rating) === 4}
          readOnly
        />
        <input
          type="radio"
          name={completedBook.title}
          className="mask mask-star-2 bg-orange-400 hover:bg-orange-500"
          aria-label="5 stars"
          value={5}
          checked={Number(completedBook.rating) === 5}
          readOnly
        />
      </div>
    </>
  );
};

export default Rating;
