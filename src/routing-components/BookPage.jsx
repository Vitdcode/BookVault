import { useOutletContext, useParams } from "react-router-dom";
import CompletedStatus from "../functional-components/CompletedStatus";
import AddToFavorites from "../functional-components/AddToFavorites";
import AddToBookmarks from "../functional-components/AddToBookmarks";
import { RxAvatar } from "react-icons/rx";
import { GoBook } from "react-icons/go";
import Rating from "../functional-components/Rating";
import { FaRegCalendarAlt } from "react-icons/fa";
import WriteReview, { Review } from "../functional-components/WriteReview";
import { useState } from "react";

const BookPage = () => {
  const { books, fetchedBooks } = useOutletContext();
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const bookData =
    books.find((b) => b.googleBooksId == id) || fetchedBooks.find((b) => b.googleBooksId === id);
  const review = books.find((book) => book.id === bookData.id)?.review || "";
  const [editReview, setEditReview] = useState(false);
  bookData;
  if (!bookData) return;
  // depending on the route, the bookData will be either from the books state or the fetchedBooks state

  function convertToMetricDate(americanDate) {
    if (!americanDate) return "";
    if (!americanDate.includes("-")) return americanDate;

    const [year, month, day] = americanDate.split("-");
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="flex flex-col justify-center items-center m-20">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        {/* Book Cover and Title Section */}
        <div className="flex flex-col  gap-4">
          <div className="bg-base-200 p-1 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
            <img
              src={bookData.coverUrl}
              alt={bookData.title}
              className="h-64 sm:h-80 w-auto object-cover rounded-lg"
            />
          </div>
          {<Rating completedBook={bookData} />}
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col flex-1 gap-6 ">
          {/* Author and Publication Info */}
          <div className="flex flex-col gap-2 p-5 rounded-xl bg-base-100 shadow-md border  border-gray-100">
            <div className="">
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
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: showFullDescription ? "600px" : "100px", // Adjust max height as needed
              }}
            >
              <p className="leading-relaxed">{bookData.description}</p>
            </div>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-500 mt-2 cursor-pointer hover:underline"
            >
              {showFullDescription ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Book Actions */}
          <div className="flex items-center justify-center gap-2 w-[80%] mx-auto">
            <div className="transition-transform hover:scale-105">
              <CompletedStatus bookData={bookData} />
            </div>
            <div className="transition-transform hover:scale-105">
              <AddToFavorites bookData={bookData} />
            </div>
            <div className="transition-transform hover:scale-105">
              <AddToBookmarks bookData={bookData} />
            </div>
            <div>
              <WriteReview
                editReview={editReview}
                setEditReview={setEditReview}
                review={review}
                id={bookData.googleBooksId}
              />
            </div>
          </div>
          <Review editReview={editReview} review={review} bookData={bookData} />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
