import express from "express";
import {
  listBooks,
  searchBooks,
  createBook,
  getBook,
} from "../controllers/book";

import { createBookValidator, searchBookValidator } from "../validators/book";

import { validate } from "../middleware/validate";
const router = express.Router();

router
  .route("/")
  .get(listBooks) // GET /book - List all books
  .post(createBookValidator, validate, createBook); // POST /book - Create a new book

router.get("/search", searchBookValidator, validate, searchBooks);
router.route("/:id").get(getBook);

export default router;
