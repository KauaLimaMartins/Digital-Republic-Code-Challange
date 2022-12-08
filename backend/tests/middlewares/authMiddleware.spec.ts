import request from "supertest";
import { app } from "../../src/app";

describe("authMiddleware", () => {
  it("Should not be able to pass in authentication without pass an access token", async () => {
    // I passed this route because it needs to be logged in to access
    const response = await request(app).post("/api/account/deposit");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("you must be logged in to do this");
  });

  it("Should not be able to pass in authentication with an invalid token", async () => {
    // I passed this route because it needs to be logged in to access
    const response = await request(app).post("/api/account/transfer").set({
      Authorization: `Bearer invalidToken`,
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("invalid token");
  });
});
