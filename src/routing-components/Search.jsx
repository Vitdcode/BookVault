import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { fetchedBooks, setFetchedBooks } = useOutletContext();

  const handleFetch = (e) => {
    e.preventDefault();
    setFetchedBooks([]);
    const query = searchInput;
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=10&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data;
        data.items.forEach((book) => {
          const bookData = book.volumeInfo;
          const coverUrl = bookData.imageLinks?.thumbnail;
          if (!coverUrl || !bookData.description) return;

          setFetchedBooks((prevBooks) => [
            ...prevBooks,
            {
              googleBooksId: book.id,
              title: bookData.title,
              coverUrl: coverUrl,
              description: bookData.description,
              authors: bookData.authors,
              pageCount: bookData.pageCount,
              publishedDate: bookData.publishedDate,
              rating: null,
              review: "",
              isFavorite: false,
              isBookmarked: false,
              isCompleted: false,
              yearCompleted: "",
            },
          ]);
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <form onSubmit={(e) => handleFetch(e)} className="mt-10 max-w-4xl mx-auto sm:mt-30">
        <h2 className="text-xl text-center font-semibold mb-4">Book Search</h2>

        <div className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input w-full px-4 py-3 pr-24 pl-10 bg-base-200 border border-gray-200 
            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter book title"
          />
          <svg
            className="absolute left-3 text-gray-400"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <button
            type="submit"
            className="absolute right-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-10 flex flex-wrap gap-8 justify-center px-4">
        {fetchedBooks &&
          fetchedBooks.map((book) => (
            <Link
              to={`/book/${book.googleBooksId}`}
              key={book.id}
              className="flex flex-col items-center bg-base-100 rounded-xl shadow-lg 
            transition-transform transform scale-100 hover:scale-105 duration-300 ease-in-out 
            hover:cursor-pointer hover:shadow-xl w-48 overflow-hidden"
            >
              <img src={book.coverUrl} alt={book.title} className="w-full h-64 object-cover" />
              <div className="p-4 w-full">
                <h2 className="text-lg font-semibold text-center line-clamp-2">{book.title}</h2>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Search;
