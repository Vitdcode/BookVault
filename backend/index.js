import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "./routes/books.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

// Start server
const port = process.env.NODE_PORT || 5000;
app.listen(port, () => {
  `Server running on port ${port}`;
});
