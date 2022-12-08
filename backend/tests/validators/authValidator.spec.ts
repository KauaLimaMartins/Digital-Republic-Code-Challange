import request from "supertest";
import { app } from "../../src/app";

describe("AuthValidator", () => {
  it("Should not be able to pass in auth validation if not pass full name", async () => {
    const response = await request(app).post("/api/login").send({
      cpf: "111.222.333-44",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toBe("full name is required");
  });

  it("Should not be able to pass in auth validation if not pass cpf", async () => {
    const response = await request(app).post("/api/register").send({
      full_name: "teste",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toBe("cpf is required");
  });

  it("Should not be able to pass in auth validation if cpf format is invalid", async () => {
    const response = await request(app).post("/api/login").send({
      full_name: "teste",
      cpf: "111.222.333.44",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toBe("invalid cpf format");
  });
});
