import { body } from "express-validator";

export const createOrderValidator = [
  body("customerId")
    .isInt({ gt: 0 })
    .withMessage("customerId must be a positive integer"),
];
