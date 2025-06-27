import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  createTransactionValidator,
  transactionIdParamValidator,
} from "../validators/transaction";
import {
  createTransaction,
  getTransaction,
  listTransactions,
} from "../controllers/transactions";

const router = Router();
router
  .route("/")
  .post(createTransactionValidator, validate, createTransaction)
  .get(listTransactions);

router.route("/:id").get(transactionIdParamValidator, validate, getTransaction);

export default router;
