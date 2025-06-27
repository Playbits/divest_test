import { Request, Response } from "express";
import { sequelize } from "../models";
import { Cart } from "../models/cart";
import { CartItem } from "../models/cartitem";
import { Book } from "../models/book";
import { Order } from "../models/order";
import { OrderItem } from "../models/orderitem";

export const createOrderFromCart = async (req: Request, res: Response) => {
  const { customerId } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Find active cart
    const cart = await Cart.findOne({
      where: { customerId },
      transaction,
    });

    if (!cart) {
      await transaction.rollback();
      res.status(404).json({ message: "Cart is empty or not found" });
      return;
    }

    let cartItems: CartItem[];
    cartItems = await CartItem.findAll({
      where: {
        cartId: cart?.dataValues.id,
      },

      transaction,
    });

    if (cartItems.length == 0) {
      await transaction.rollback();
      res.status(404).json({ message: "Cart is empty or not found" });
      return;
    }

    // Create new order
    const order = await Order.create(
      {
        customerId,
        total: 0,
      },
      { transaction }
    );
    const bookIds = cartItems.map((item) => item.dataValues.bookId);
    const books = await Book.findAll({
      where: { id: bookIds },
      transaction,
    });
    let order_total = 0;
    // Prepare bulk order items
    const orderItemsPayload = cartItems.map((item) => {
      const book = books.find(
        (book) => book.dataValues.id == item.dataValues.bookId
      );
      const item_value = book?.dataValues.price * item.dataValues.quantity;
      order_total += item_value;
      return {
        orderId: order.dataValues.id,
        bookId: item.dataValues.bookId,
        quantity: item.dataValues.quantity,
        price: book?.dataValues.price,
      };
    });

    // Insert all order items at once
    await OrderItem.bulkCreate(orderItemsPayload, { transaction });

    // Update total on order
    await order.update({ total: order_total }, { transaction });

    // clear cart
    await CartItem.destroy({
      where: { cartId: cart?.dataValues.id },
      transaction,
    });

    await transaction.commit();
    res
      .status(201)
      .json({ message: "Order created", orderId: order.dataValues.id });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.customerId);

    if (isNaN(customerId)) {
      res.status(400).json({ message: "Invalid customer ID" });
    }

    const orders = await Order.findAll({
      where: { customerId },
      order: [["createdAt", "DESC"]],
    });

    const orderIds = orders.map((order) => order.dataValues.id);
    if (orderIds.length === 0) {
      res.status(200).json([]);
    }

    // Get order items for all orders
    const items = await OrderItem.findAll({
      where: { orderId: orderIds },
    });

    // Group items under their order
    const orderMap = orders.map((order) => ({
      ...order.dataValues,
      items: items.filter(
        (item) => item.dataValues.orderId === order.dataValues.id
      ),
    }));

    res.status(200).json(orderMap);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
