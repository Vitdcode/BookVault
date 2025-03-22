import { Router } from "express";
import {
  addBookToDb,
  changeBookData,
  deleteBook,
  getAllBooks,
} from "../controller/booksController.js";

const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/addbook", addBookToDb);
booksRouter.patch("/updateProperty", changeBookData);
booksRouter.delete("/:id", deleteBook);

export default booksRouter;
