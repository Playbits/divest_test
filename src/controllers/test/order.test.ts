import request from "supertest";
import app from "../../index";

describe("Order Controller", () => {
  it("should return 404 when cart is empty or not found", async () => {
    const res = await request(app)
      .post("/api/order")
      .send({ customerId: 99999 });
    expect(res.statusCode).toBe(404);
  });
});
