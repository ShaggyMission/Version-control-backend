const request = require("supertest");
const app = require("../src/app");

describe("API Topics", () => {

  test("GET /api/topics debe responder 200", async () => {
    const response = await request(app).get("/api/topics");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/topics/1 debe responder un tema", async () => {
    const response = await request(app).get("/api/topics/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
  });

 test("GET /api/topics/999 debe responder 404", async () => {
    const response = await request(app).get("/api/topics/999");
    expect(response.statusCode).toBe(404);
  });

});