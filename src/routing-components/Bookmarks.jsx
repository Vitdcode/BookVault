import { useOutletContext } from "react-router-dom";

const Bookmarks = () => {
  const { bookmarks } = useOutletContext();

  return (
    <div>
      {bookmarks.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.coverUrl} alt={book.title} />
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
