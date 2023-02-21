const request = require("supertest");
const app = require("../../index");
describe("POST signin", () => {
  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/signin").send({
        email: "noman@gmail.com",
        password: "noman123456",
      });
      expect(response).toEqual(200);
    });
  });
});
