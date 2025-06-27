import { body } from "express-validator";

export const addToCartValidator = [
  body("customerId")
    .isInt({ gt: 0 })
    .withMessage("customerId must be a positive integer"),
  body("bookId")
    .isInt({ gt: 0 })
    .withMessage("bookId must be a positive integer"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("quantity must be a positive integer"),
];

export const removeFromCartValidator = [
  body("customerId")
    .isInt({ gt: 0 })
    .withMessage("customerId must be a positive integer"),
  body("bookId")
    .isInt({ gt: 0 })
    .withMessage("bookId must be a positive integer"),
];
