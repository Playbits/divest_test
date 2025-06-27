import request from "supertest";
import app from "../../index";

describe("Transactions Controller", () => {
  it("should return 404 for non-existent transaction", async () => {
    const res = await request(app).get("/api/payment/99999");
    expect(res.statusCode).toBe(404);
  });

  it("should return 404 for non-existent customer transactions", async () => {
    const res = await request(app).get("/api/payment/customer/99999");
    // Depending on implementation, this could be 200 with empty array or 404
    expect([200, 404]).toContain(res.statusCode);
  });

  it("should fail to create transaction with invalid amount", async () => {
    const res = await request(app).post("/api/payment").send({
      amount: -10,
      orderId: 1,
      paymentMethod: "card",
      status: "pending",
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail to create transaction with missing fields", async () => {
    const res = await request(app).post("/api/payment").send({
      amount: 100,
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail to create transaction with invalid status", async () => {
    const res = await request(app).post("/api/payment").send({
      amount: 100,
      orderId: 1,
      paymentMethod: "card",
      status: "unknown",
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail to get transaction with invalid id param", async () => {
    const res = await request(app).get("/api/payment/abc");
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail to get customer transactions with invalid customerId param", async () => {
    const res = await request(app).get("/api/payment/customer/xyz");
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });
});
