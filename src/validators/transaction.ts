import { body, param } from "express-validator";

export const createTransactionValidator = [
  body("amount")
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage("amount must be a positive number"),
  body("reference")
    .isString()
    .notEmpty()
    .withMessage("reference is required and must be a string"),
  body("orderId")
    .isInt({ gt: 0 })
    .notEmpty()
    .withMessage("orderId must be a positive integer"),
  body("paymentMethod")
    .isString()
    .notEmpty()
    .withMessage("paymentMethod is required and must be a string"),

  body("status")
    .isIn(["pending", "successful", "failed"])
    .withMessage("status must be one of: pending, successful, failed"),
];

export const transactionIdParamValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Transaction ID must be a positive integer"),
];
