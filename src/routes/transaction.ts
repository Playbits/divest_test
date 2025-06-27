import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  createTransactionValidator,
  customerIdParamValidator,
  transactionIdParamValidator,
} from "../validators/transaction";
import {
  createTransaction,
  getTransaction,
  viewCustomerTransactions,
} from "../controllers/transactions";

const router = Router();
router.route("/").post(createTransactionValidator, validate, createTransaction);

router.route("/:id").get(transactionIdParamValidator, validate, getTransaction);

router.get(
  "/customer/:customerId",
  customerIdParamValidator,
  validate,
  viewCustomerTransactions
);
export default router;
