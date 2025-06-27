import { body, param, query } from "express-validator";

export const createBookValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("genre").notEmpty().isString(),
  body("quantity").notEmpty().isNumeric(),
  body("price")
    .notEmpty()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

export const updateBookValidator = [
  param("id").isInt().withMessage("Book ID must be an integer"),
  body("title").optional().isString(),
  body("author").optional().isString(),
  body("quantity").optional().isNumeric(),
  body("genre").optional().isString(),
  body("price").optional().isFloat({ gt: 0 }),
];

export const searchBookValidator = [
  query("q")
    .trim()
    .notEmpty()
    .withMessage("Search query (q) is required")
    .isString()
    .withMessage("Query must be a string"),
];
