import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const { books, setBooks } = useOutletContext();

  const handleFetch = (e) => {
    e.preventDefault();
    setBooks([]);
    const query = searchInput;
    console.log(query);
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.items.forEach((book) => {
          const bookData = book.volumeInfo;
          const coverUrl = bookData.imageLinks?.thumbnail;

          if (!coverUrl || !bookData.description) return;

          setBooks((prevBooks) => [
            ...prevBooks,
            {
              id: book.id,
              title: bookData.title,
              coverUrl: coverUrl,
              description: bookData.description,
              bookCompleted: false,
            },
          ]);
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <form onSubmit={(e) => handleFetch(e)} className="mt-10">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Book Search</legend>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input"
            placeholder="Enter book title"
          />
          <button role="submit" className="btn btn-accent">
            Search
          </button>
        </fieldset>
      </form>
      <div className="flex flex-wrap gap-10">
        {books &&
          books.map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-base-200 transition-transform transform scale-100 hover:scale-105 duration-300 ease-in-out hover:cursor-pointer"
              state={{
                title: book.title,
                coverUrl: book.coverUrl,
                description: book.description,
                bookCompleted: book.bookCompleted,
                id: book.id,
              }}
            >
              <h1 className="text-center">{book.title}</h1>
              <img src={book.coverUrl} alt="" />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
