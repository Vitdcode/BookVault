import { useLocation, useOutletContext, useParams } from "react-router-dom";
import CompletedStatus from "../functional-components/CompletedStatus";
import AddToFavorites from "../functional-components/AddToFavorites";
import AddToBookmarks from "../functional-components/AddToBookmarks";
import { RxAvatar } from "react-icons/rx";
import { GoBook } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import Rating from "../functional-components/Rating";

const BookPage = () => {
  const { completedBooks } = useOutletContext();
  const location = useLocation();
  const bookData = location.state.book;
  const completedBook = completedBooks.find((b) => b.id === bookData.id);

  function convertToMetricDate(americanDate) {
    if (!americanDate) return "";
    const [year, month, day] = americanDate.split("-");
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="flex flex-col justify-center items-center m-10 max-w-4xl mx-auto mt-30">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
        {/* Book Cover and Title Section */}
        <div className="flex flex-col items-center md:items-start gap-4 relative w-fit">
          <div className="bg-base-200 p-1 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
            <img
              src={bookData.coverUrl}
              alt={bookData.title}
              className="h-64 sm:h-80 w-auto object-cover rounded-lg"
            />
          </div>
          <Rating completedBook={completedBook} />
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Author and Publication Info */}
          <div className="flex flex-col gap-2 p-5 rounded-xl bg-base-100 shadow-md border border-gray-100">
            <div className="space-y-1">
              {bookData.authors.map((author, index) => (
                <div key={index} className="flex items-center gap-2">
                  <RxAvatar color="rgb(43, 127, 255)" size={20} />
                  <span className="font-medium ">
                    Author: <span className="">{author}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <GoBook color="rgb(43, 127, 255)" size={20} />
              <p className="font-medium">{bookData.pageCount} pages</p>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCalendarAlt color="rgb(43, 127, 255)" size={20} />
              <p className="font-medium ">
                Published: <span className="">{convertToMetricDate(bookData.publishedDate)}</span>
              </p>
            </div>
          </div>
          <h2 className="font-bold text-2xl text-center md:text-left">{bookData.title}</h2>
          {/* Book Description */}
          <div className="bg-base-100 p-5 rounded-xl shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg mb-3 ">Description</h3>
            <p className="leading-relaxed">{bookData.description}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 mt-10 w-full">
        <div className="transition-transform hover:scale-105">
          <CompletedStatus bookData={bookData} />
        </div>
        <div className="transition-transform hover:scale-105">
          <AddToFavorites bookData={bookData} />
        </div>
        <div className="transition-transform hover:scale-105">
          <AddToBookmarks bookData={bookData} />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
