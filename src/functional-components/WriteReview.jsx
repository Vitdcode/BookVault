import { LuPen } from "react-icons/lu";
import { useOutletContext } from "react-router-dom";
import TextEditor from "../Tiptap/Tiptap";
import bookApis from "../api";

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
  const handleReviewChange = (htmlContent) => {
    const bookExists = books.find((book) => book.id === bookData.id);

    if (!bookExists) {
      setBooks([...books, bookData]);
    } else {
      setBooks((prev) =>
        prev.map((book) => (book.id === bookData.id ? { ...book, review: htmlContent } : book))
      );
    }
  };
  return (
    <div>
      {editReview ? (
        <div className=" top-20 left-0 w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          <TextEditor
            content={review}
            handleContentChange={(htmlContent) => handleReviewChange(htmlContent)}
          />
        </div>
      ) : (
        <div className=" top-20 left-0 bg-base-200  shadow-lg p-4 rounded-xl w-[100%]">
          <h2 className="mb-4 text-xl font-bold">Review</h2>
          {bookData.review ? (
            <div dangerouslySetInnerHTML={{ __html: bookData.review }} />
          ) : (
            <p className="font-light text-gray-500">Nothing here yet, write a review</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WriteReview;
