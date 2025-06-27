import { Book } from "../models/book";
import { Request, Response } from "express";
import { Op } from "sequelize";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, quantity, price } = req.body;
    const newBook = await Book.create({
      title,
      author,
      genre,
      price,
      stock: quantity,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book", error });
  }
};

export const listBooks = async (_req: Request, res: Response) => {
  const books = await Book.findAll();
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByPk(Number(id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};
export const searchBooks = async (req: Request, res: Response) => {
  const { q } = req.query as { q: string };
  const books = await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { author: { [Op.like]: `%${q}%` } },
        { genre: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  res.json(books);
};
