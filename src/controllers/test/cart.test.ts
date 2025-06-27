import request from "supertest";
import app from "../../index";

describe("Cart Endpoints", () => {
  it("should add a book to the cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ customerId: 1, bookId: 2, quantity: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
