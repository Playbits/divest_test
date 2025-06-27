import { Request, Response } from "express";
import { Customer } from "../models/customer";
import { Cart } from "../models/cart";
import { CartItem } from "../models/cartitem";

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add book",
      error: error?.original.sqlMessage,
    });
  }
};

// Get all customers
export const getCustomers = async (_req: Request, res: Response) => {
  const customers = await Customer.findAll();
  res.json(customers);
};

// Get a single customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findByPk(parseInt(id));
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
};

// Get a customer's cart by customer ID
export const getCustomerCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customerId = parseInt(id);
  try {
    const cart = await Cart.findOne({
      where: { customerId },
    });
    const cartId = cart?.dataValues.id;
    const items = await CartItem.findAll({
      where: {
        cartId,
      },
    });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    res.json({ ...cart.dataValues, items });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch customer cart",
      error: error?.original.sqlMessage,
    });
  }
};
