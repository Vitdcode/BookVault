import { LuPen } from "react-icons/lu";
import { useOutletContext } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import bookApis from "../api";
import remarkBreaks from "remark-breaks";

const WriteReview = ({ editReview, setEditReview, review, id }) => {
  return (
    <div>
      <button
        className="btn btn-outline gap-2 w-[160px]"
        onClick={() => {
          let flag = !editReview;
          setEditReview(flag);
          if (!flag) {
            id, review;
            bookApis.updateProperty(id, "review", review);
          }
        }}
      >
        <LuPen size={20} />
        {editReview ? "Save" : "Write a review"}
      </button>
    </div>
  );
};

export const Review = ({ editReview, review, bookData }) => {
  const { books, setBooks } = useOutletContext();

  const handleReviewChange = (e) => {
    const bookExists = books.find((book) => book.googleBooksId === bookData.googleBooksId);

    if (!bookExists) {
      setBooks([...books, bookData]);
    } else {
      setBooks((prev) =>
        prev.map((book) =>
          book.googleBooksId === bookData.googleBooksId ? { ...book, review: e.target.value } : book
        )
      );
    }
  };

  const customComponents = {
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="my-4 border-l-4 border-slate-300  pl-4 py-2 italic  dark:border-slate-600 dark:bg-base-300  rounded-r-md whitespace-pre-wrap"
        {...props} // Pass down children and any other props
      />
    ),
  };

  return (
    <div>
      {editReview ? (
        <div className=" top-20 left-0 w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          <textarea
            className="textarea w-[80%] min-h-[300px]"
            value={review}
            onChange={handleReviewChange}
          />
        </div>
      ) : (
        <div className=" top-20 left-0 bg-base-200  shadow-lg p-4 rounded-xl w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          {bookData.review ? (
            <ReactMarkdown components={customComponents} remarkPlugins={remarkBreaks}>
              {review}
            </ReactMarkdown>
          ) : (
            <p className="font-light text-gray-500">Nothing here yet, write a review</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WriteReview;
