import { useOutletContext } from "react-router-dom";

const Rating = ({ completedBook }) => {
  console.log(completedBook);
  const { setBooks } = useOutletContext();

  const handleRatingChange = (e) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === completedBook.id ? { ...b, rating: e.target.value } : b))
    );
  };

  return (
    <>
      <div
        className="rating flex justify-center w-[100%] hover:bg-base-200 p-2 rounded-lg"
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
