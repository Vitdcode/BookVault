import { Router } from "express";
import {
  addBookToDb,
  changeBookData,
  deleteBook,
  getAllBooks,
  getCountFinishedBooksCurrentYear,
} from "../controller/booksController.js";

const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/addbook", addBookToDb);
booksRouter.patch("/updateProperty", changeBookData);
booksRouter.delete("/:id", deleteBook);
booksRouter.get("/countFinishedBooksCurrentYear", getCountFinishedBooksCurrentYear);

export default booksRouter;
