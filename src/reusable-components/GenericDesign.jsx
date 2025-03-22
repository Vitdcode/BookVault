import { Link, useOutletContext } from "react-router-dom";
import Rating from "../functional-components/Rating";
import { useState } from "react";

const GenericDesign = ({ renderIcon, title, searchTerm }) => {
  const [completedBooksYear, setCompletedBooksYear] = useState(new Date().getFullYear());
  const { books } = useOutletContext();

  const filteredArray = books.filter((book) => book[searchTerm]);
  const groupedBooks = books.reduce((acc, book) => {
    const year = book.yearCompleted;

    if (!acc[year] && year !== "") {
      acc[year] = [];
    }
    acc[year]?.push(book);

    return acc; // Always return the accumulator
  }, {});

  return (
    <div className=" mx-auto px-4 py-8 mt-30">
      {filteredArray.length === 0 ? (
        <div className="text-center py-16 text-base-content text-lg">
          No items yet. Start adding some!
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
          <div className="flex gap-10">
            {searchTerm != "isCompleted" ? (
              <div className="flex flex-wrap gap-10 justify-center">
                {filteredArray.map((book) => (
                  <BookDetails book={book} renderIcon={renderIcon} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-10 items-center">
                <select
                  onChange={(e) => setCompletedBooksYear(e.target.value)}
                  defaultValue={completedBooksYear}
                  className="select "
                >
                  <option disabled={true}>Pick a year</option>
                  {Object.keys(groupedBooks).map((year) => year != "" && <option>{year}</option>)}
                </select>
                <div className="flex flex-col gap-10">
                  <div className="flex gap-20  flex-wrap justify-center">
                    {groupedBooks[completedBooksYear]?.map((book) => (
                      <BookDetails book={book} renderIcon={renderIcon} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const BookDetails = ({ book, renderIcon }) => {
  book;
  return (
    <Link
      to={`/book/${book.googleBooksId}`}
      key={book.id}
      className="flex flex-col w-[350px] items-center justify-around rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-200 hover:cursor-pointer"
    >
      <img src={book.coverUrl} alt="" className="p-2 shadow-lg bg-base-200 rounded-lg" />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-base-content mb-2 line-clamp-1">{book.title}</h2>
        {book.isCompleted && <Rating completedBook={book} />}
        {book.authors && (
          <p className="text-sm text-secondary mb-4 p-2 bg-base-200 rounded">
            by {book.authors.join(", ")}
          </p>
        )}
        <p className="text-base-content text-sm mb-4 line-clamp-3">
          {book.description || "No description available"}
        </p>
        <>{renderIcon(book)}</>
      </div>
    </Link>
  );
};

export default GenericDesign;
