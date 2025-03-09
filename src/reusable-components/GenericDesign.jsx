import { Link } from "react-router-dom";

const GenericDesign = ({ array, renderIcon, title }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-30">
      {array.length === 0 ? (
        <div className="text-center py-16 text-base-content text-lg">
          No items yet. Start adding some!
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {array.map((book) => (
              <Link
                to={`/book/${book.id}`}
                key={book.id}
                className="flex flex-col items-center rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-200 hover:cursor-pointer"
                state={{ book }}
              >
                <img src={book.coverUrl} alt="" className="p-2 shadow-lg bg-base-200 rounded-lg" />

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-base-content mb-2 line-clamp-2">
                    {book.title}
                  </h2>
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GenericDesign;
