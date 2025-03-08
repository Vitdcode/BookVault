import { useOutletContext } from "react-router-dom";

const CompletedBooks = () => {
  const { completedBooks } = useOutletContext();

  return (
    <div>
      {completedBooks.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.coverUrl} alt={book.title} />
        </div>
      ))}
    </div>
  );
};

export default CompletedBooks;
