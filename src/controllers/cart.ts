import { CartItem } from "../models/cartitem";
import { Cart } from "../models/cart";
import { Request, Response } from "express";
import { Book } from "../models/book";

export const addToCart = async (req: Request, res: Response) => {
  const { customerId, bookId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ where: { customerId } });
    if (!cart) {
      cart = await Cart.create({ customerId });
    }

    let item = await CartItem.findOne({
      where: { cartId: cart.dataValues.id, bookId },
    });
    const book = await Book.findByPk(bookId);
    if (book?.dataValues.stock >= quantity) {
      if (item) {
        if (book?.dataValues.stock >= quantity + item.dataValues.quantity) {
          item.quantity += quantity;
          await item.save();
        } else {
          res.status(400).json({
            message: "Failed to add book to cart",
            error: "Not enough books in stock",
          });
        }
      } else {
        await CartItem.create({ cartId: cart.dataValues.id, bookId, quantity });
      }
    } else {
      res.status(400).json({
        message: "Failed to add book to cart",
        error: "Not enough books in stock",
      });
    }
    const items = await CartItem.findAll({
      where: { cartId: cart.dataValues.id },
    });
    res.status(200).json({ message: "Book added to cart", cart, items });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add book to cart", error: error?.original });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { customerId, bookId } = req.body;

  const cart = await Cart.findOne({ where: { customerId, status: "open" } });
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
  }

  const item = await CartItem.findOne({
    where: { cartId: cart.dataValues.id, bookId },
  });
  if (!item) {
    res.status(404).json({ message: "Item not found in cart" });
  }

  await item.destroy();
  res.status(200).json({ message: "Book removed from cart" });
};
