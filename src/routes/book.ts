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
// Helper to wrap async route handlers and forward errors to Express error handler
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.route("/:id").get(asyncHandler(getBook));

export default router;
