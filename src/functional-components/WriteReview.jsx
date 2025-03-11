import { useState } from "react";
import { LuPen } from "react-icons/lu";
import { useOutletContext } from "react-router-dom";

const WriteReview = ({ bookData }) => {
  const { books, setBooks } = useOutletContext();
  const hasReview = books.find((book) => book.id === bookData.id)?.review || "";
  const [editReview, setEditReview] = useState(false);

  const handleReviewChange = (e) => {
    const bookExists = books.find((book) => book.id === bookData.id);

    if (!bookExists) {
      setBooks([...books, bookData]);
    } else {
      setBooks((prev) =>
        prev.map((book) => (book.id === bookData.id ? { ...book, review: e.target.value } : book))
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEditReview(!editReview);
      }}
    >
      <button className="btn btn-outline gap-2 w-[160px]" type="submit">
        <LuPen size={20} />
        {editReview ? "Save" : "Write a review"}
      </button>
      {editReview ? (
        <div className="absolute top-20 left-0 w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          <textarea
            name={`${bookData.title} review`}
            id={`${bookData.title} review`}
            value={hasReview}
            onChange={handleReviewChange}
            className="textarea w-[100%] transition duration-300 ease-in-out focus:border-2 focus:border-base-300 focus:outline-none"
          >
            {hasReview}
          </textarea>
        </div>
      ) : (
        <div className="absolute top-20 left-0 bg-base-200 shadow-lg p-4 rounded-xl w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          {bookData.review ? (
            <p className="font-semibold">{bookData.review}</p>
          ) : (
            <p className="font-light text-gray-500">Nothing here yet, write a review</p>
          )}
        </div>
      )}
    </form>
  );
};

export default WriteReview;
