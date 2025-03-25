import bookApis from "../api";

const toggleProperty = (
  books,
  setBooks,
  bookData,
  activeProperty,
  propertyCheck1,
  propertyCheck2,
  e
) => {
  e.preventDefault();
  const booksExists = books.find((book) => book.googleBooksId === bookData.googleBooksId);

  let updatedBooks;

  if (
    booksExists &&
    (booksExists[propertyCheck1] || booksExists[propertyCheck2] || booksExists.review)
  ) {
    // Case 1: Toggle the property for an existing book

    updatedBooks = books.map((book) =>
      book.googleBooksId === booksExists.googleBooksId
        ? { ...book, [activeProperty]: !book[activeProperty] }
        : book
    );

    bookApis.updateProperty(bookData.googleBooksId, activeProperty);
  } else if (
    booksExists &&
    !booksExists[propertyCheck1] &&
    !booksExists[propertyCheck2] &&
    !booksExists.review
  ) {
    // Case 2: Remove the book if it has no other flags or review

    bookApis.deleteBook(bookData.id);
    window.location.href = "/search"; //user is redirected to search url as the data for the book no longer exist
    updatedBooks = books.filter((book) => book.id !== booksExists.id);
  } else {
    // Case 3: Add a new book with the active property set to true
    let bookWithUpdatedFlag;
    if (activeProperty === "isCompleted") {
      bookWithUpdatedFlag = {
        ...bookData,
        [activeProperty]: true,
        yearCompleted: new Date().getFullYear(),
      };
    } else {
      bookWithUpdatedFlag = { ...bookData, [activeProperty]: true };
    }
    bookApis.insertBook(bookWithUpdatedFlag); //updates the SQL Data on the server
    updatedBooks = [...books, bookWithUpdatedFlag]; // updates data for front end
  }

  // Update the state with the new array
  setBooks(updatedBooks);
  // Return the updated array for immediate use
  return updatedBooks;
};

export default toggleProperty;
