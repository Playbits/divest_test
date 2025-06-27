import request from "supertest";
import app from "../../index";

describe("Book Controller", () => {
  it("should list all books", async () => {
    const res = await request(app).get("/api/book");
    expect(res.statusCode).toBe(200);
  });

  it("should return 404 for non-existent book", async () => {
    const res = await request(app).get("/api/book/99999");
    expect(res.statusCode).toBe(404);
  });
  it("should create a new book with valid data", async () => {
    const newBook = {
      title: "test book",
      author: "test author",
      genre: "test genre",
      price: 20000,
      quantity: 200,
    };
    const res = await request(app).post("/api/book").send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newBook.title);
  });

  it("should fail to create a book with invalid data", async () => {
    const invalidBook = {
      title: "",
      author: "",
      isbn: "",
    };
    const res = await request(app).post("/api/book").send(invalidBook);
    expect(res.statusCode).toBe(422);
  });

  it("should search books with query", async () => {
    const res = await request(app).get("/api/book/search").query({ q: "Test" });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a book by id", async () => {
    // First, create a book
    const newBook = {
      title: "Another book",
      author: "another author",
      genre: "another genre",
      price: 5000,
      quantity: 200,
    };
    const createRes = await request(app).post("/api/book").send(newBook);
    const bookId = createRes.body.id;

    // Now, get the book by id
    const res = await request(app).get(`/api/book/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", bookId);
    expect(res.body.title).toBe(newBook.title);
  });
});
