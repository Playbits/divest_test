import { Router } from "express";
import { createOrderFromCart } from "../controllers/order";
import { validate } from "../middleware/validate";
import { createOrderValidator } from "../validators/order";

const router = Router();
router.post("/", createOrderValidator, validate, createOrderFromCart);

export default router;
