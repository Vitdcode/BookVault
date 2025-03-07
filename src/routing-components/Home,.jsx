import { useState } from "react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const handleFetch = (e) => {
    e.preventDefault();
    const query = searchInput;
    console.log(query);
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const bookData = data["items"][0]["volumeInfo"];
        console.log(bookData);
        const bookID = data["items"][0].id;
        console.log(data);
        setBooks([
          ...books,
          {
            id: bookID,
            title: bookData.title,
            coverUrl: bookData["imageLinks"].thumbnail,
          },
        ]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <form onSubmit={(e) => handleFetch(e)}>
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
      {books &&
        books.map((book) => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <img src={book.coverUrl} alt="" />
          </div>
        ))}
    </>
  );
};

export default Home;
