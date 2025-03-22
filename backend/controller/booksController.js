import pool from "../config/database.js";

function camelToSnake(camelCase) {
  return camelCase.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export const getAllBooks = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM books");
    // Map snake_case to camelCase for the frontend
    const books = rows.map((row) => ({
      id: row.id,
      googleBooksId: row.google_books_id,
      title: row.title,
      coverUrl: row.cover_url,
      description: row.description,
      authors: row.authors,
      pageCount: row.page_count,
      publishedDate: row.published_date,
      rating: row.rating,
      review: row.review,
      isFavorite: row.is_favorite,
      isBookmarked: row.is_bookmarked,
      isCompleted: row.is_completed,
      yearCompleted: row.year_completed,
    }));
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook: deleteResult });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const changeBookData = async (req, res) => {
  try {
    const { id, property, content = null } = req.body;
    const propSnakeCase = camelToSnake(property);
    let updateResult;
    if (!content) {
      updateResult = await pool.query(
        `UPDATE books SET ${propSnakeCase} = NOT ${propSnakeCase} WHERE google_books_id = $1`,
        [id]
      );
    } else {
      updateResult = await pool.query(
        `UPDATE books SET ${propSnakeCase} = $2 WHERE google_books_id = $1`,
        [id, content]
      );
    }

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", property: property });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addBookToDb = async (req, res) => {
  try {
    const {
      googleBooksId,
      title,
      coverUrl,
      description,
      authors,
      pageCount,
      publishedDate,
      rating,
      review,
      isFavorite,
      isBookmarked,
      isCompleted,
      yearCompleted,
    } = req.body;

    const newBook = await pool.query(
      "INSERT INTO books (google_books_id, title, cover_url, description, authors, page_count, published_date, rating, review, is_favorite, is_bookmarked, is_completed, year_completed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        googleBooksId,
        title,
        coverUrl,
        description,
        authors,
        pageCount,
        publishedDate,
        rating,
        review,
        isFavorite,
        isBookmarked,
        isCompleted,
        yearCompleted,
      ]
    );
    const book = newBook.rows[0];
    res.json({
      id: book.id,
      googleBooksId: book.google_books_id,
      title: book.title,
      coverUrl: book.cover_url,
      description: book.description,
      authors: book.authors,
      pageCount: book.page_count,
      publishedDate: book.published_date,
      rating: book.rating,
      review: book.review,
      isFavorite: book.is_favorite,
      isBookmarked: book.is_bookmarked,
      isCompleted: book.is_completed,
      yearCompleted: book.year_completed,
    });
  } catch (err) {
    if (err.code === "23505") {
      // Unique violation error code in PostgreSQL
      res.status(400).json({ message: "Book already exists with this Google Books ID" });
    } else {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
};
