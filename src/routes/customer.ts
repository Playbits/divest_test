import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerCart,
} from "../controllers/customer";
import {
  createCustomerValidator,
  customerIdParamValidator,
} from "../validators/customer";
import { validate } from "../middleware/validate";

const router = express.Router();

router.post("/", createCustomerValidator, validate, createCustomer);
router.get("/:id", customerIdParamValidator, validate, getCustomers);
router.get("/:id/cart", customerIdParamValidator, validate, getCustomerCart);

export default router;
