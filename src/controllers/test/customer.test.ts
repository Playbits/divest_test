import request from "supertest";
import app from "../../index";

describe("Customer Controller", () => {
  it("should return 404 for non-existent customer", async () => {
    const res = await request(app).get("/api/customer/99999");
    expect(res.statusCode).toBe(404);
  });
});
