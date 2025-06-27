import { body, param } from "express-validator";

export const createCustomerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Firstname is required")
    .isString()
    .withMessage("Firstname must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("Lastname is required")
    .isString()
    .withMessage("Lastname must be a string"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone").optional().isString().withMessage("Phone must be a string"),
];

export const updateCustomerValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Customer ID must be a positive integer"),

  body("name").optional().isString().withMessage("Name must be a string"),

  body("email").optional().isEmail().withMessage("Email must be valid"),

  body("phone").optional().isString().withMessage("Phone must be a string"),
];

export const customerIdParamValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Customer ID must be a positive integer"),
];
