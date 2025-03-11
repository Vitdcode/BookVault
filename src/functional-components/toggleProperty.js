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

  if (
    booksExists &&
    (booksExists[propertyCheck1] || booksExists[propertyCheck2] || booksExists.review)
  ) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === booksExists.id ? { ...book, [activeProperty]: !book[activeProperty] } : book
      )
    );
  } else if (
    booksExists &&
    !booksExists[propertyCheck1] &&
    !booksExists[propertyCheck2] &&
    !booksExists.review
  ) {
    setBooks(books.filter((book) => book.id != booksExists.id));
  } else {
    const bookWithUpdatedFlag = { ...bookData, [activeProperty]: true };
    setBooks((prev) => [...prev, bookWithUpdatedFlag]);
  }
};

export default toggleProperty;
