import request from "supertest";
import app from "../../index";

describe("Book Controller", () => {
  it("should list all books", async () => {
    const res = await request(app).get("/api/book");
    expect(res.statusCode).toBe(200);
    // Add more assertions as needed
  });

  it("should return 404 for non-existent book", async () => {
    const res = await request(app).get("/api/book/99999");
    expect(res.statusCode).toBe(404);
  });
});
