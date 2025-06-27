import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import { Book } from "../models/book";
import { Order } from "../models/order";
import { OrderItem } from "../models/orderitem";
import { sequelize } from "../models/index";

export const createTransaction = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const { orderId, amount, paymentMethod } = req.body;
    const reference = generateReferenceNo();
    // 1. Check if the order exists and is not already completed
    const order = await Order.findByPk(orderId, {
      transaction: t,
    });
    const orderItems = await OrderItem.findAll({
      transaction: t,
      where: {
        orderId: order?.dataValues.id,
      },
    });

    if (!order || !orderItems) {
      await t.rollback();
      res.status(404).json({ message: "Order not found" });
    }

    if (order?.dataValues.status === "completed") {
      await t.rollback();
      res.status(400).json({ message: "Order already completed" });
    }

    // check if amount is correct
    if (order?.dataValues.total != amount) {
      await t.rollback();
      res.status(404).json({
        message: "Invalid amount, order total is " + order?.dataValues.total,
      });
    }

    // 2. Create the transaction record
    const transaction = await Transaction.create(
      {
        orderId,
        amount,
        paymentMethod,
        status: "successful",
        reference,
      },
      { transaction: t }
    );

    // 3. Reduce stock of each book in the order
    for (const item of orderItems) {
      const book = await Book.findByPk(item.dataValues.bookId, {
        transaction: t,
        lock: true,
      });

      if (!book) {
        await t.rollback();
        res.status(400).json({
          message: `Book with ID ${item.dataValues.bookId} not found`,
        });
      }

      if (book?.dataValues.stock < item.dataValues.quantity) {
        await t.rollback();
        res.status(400).json({
          message: `Not enough stock for book "${book?.dataValues.title}"`,
        });
      }

      await book?.update(
        { stock: book.dataValues.stock - item.dataValues.quantity },
        { transaction: t }
      );
    }

    // 4. Update order status
    await order?.update({ status: "completed" }, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Transaction successful, order completed",
      transaction,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const viewCustomerTransactions = async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.customerId);

  try {
    // Step 1: Get all order IDs for the customer
    const customerOrders = await Order.findAll({
      where: { customerId },
      attributes: ["id"],
    });

    const orderIds = customerOrders.map((order) => order.dataValues.id);
    // Step 2: Get all transactions where orderId is in the list
    const transactions = await Transaction.findAll({
      where: {
        orderId: orderIds,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function generateReferenceNo(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `TXN-${yyyy}${mm}${dd}${hh}${min}${ss}${ms}-${rand}`;
}
