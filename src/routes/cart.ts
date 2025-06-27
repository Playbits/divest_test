import express from "express";
import { addToCart, removeFromCart } from "../controllers/cart";
import {
  addToCartValidator,
  removeFromCartValidator,
} from "../validators/cart";
import { validate } from "../middleware/validate";

const router = express.Router();
router
  .route("/")
  .post(addToCartValidator, validate, addToCart)
  .delete(removeFromCartValidator, validate, removeFromCart);

export default router;
