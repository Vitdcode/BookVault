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
  const booksExists = books.find((book) => book.id === bookData.id);

  let updatedBooks;

  if (
    booksExists &&
    (booksExists[propertyCheck1] || booksExists[propertyCheck2] || booksExists.review)
  ) {
    // Case 1: Toggle the property for an existing book
    updatedBooks = books.map((book) =>
      book.id === booksExists.id ? { ...book, [activeProperty]: !book[activeProperty] } : book
    );
  } else if (
    booksExists &&
    !booksExists[propertyCheck1] &&
    !booksExists[propertyCheck2] &&
    !booksExists.review
  ) {
    // Case 2: Remove the book if it has no other flags or review
    updatedBooks = books.filter((book) => book.id !== booksExists.id);
  } else {
    // Case 3: Add a new book with the active property set to true
    const bookWithUpdatedFlag = { ...bookData, [activeProperty]: true };
    updatedBooks = [...books, bookWithUpdatedFlag];
  }

  // Update the state with the new array
  setBooks(updatedBooks);
  // Return the updated array for immediate use
  return updatedBooks;
};

export default toggleProperty;
