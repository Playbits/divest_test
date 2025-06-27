import { Router } from "express";
import { createOrderFromCart, getCustomerOrders } from "../controllers/order";
import { validate } from "../middleware/validate";
import {
  createOrderValidator,
  customerOrderParamValidator,
} from "../validators/order";

const router = Router();
router.post("/", createOrderValidator, validate, createOrderFromCart);

router.get(
  "/customer/:customerId",
  customerOrderParamValidator,
  validate,
  getCustomerOrders
);
export default router;
