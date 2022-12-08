import request from "supertest";
import { app } from "../../src/app";

describe("AccountValidator", () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await request(app).post("/api/login").send({
      full_name: "Kaua Lima",
      cpf: "111.222.333-44",
    });

    authToken = response.body.token;
  });

  describe("Deposit money validator", () => {
    it("Should not be able to pass in deposit money validator if not pass deposit value", async () => {
      const response = await request(app)
        .post("/api/account/deposit")
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toBe("deposit value required");
    });

    it("Should not be able to pass in deposit money validator if value is less than R$ 1,00", async () => {
      const response = await request(app)
        .post("/api/account/deposit")
        .send({
          depositValue: 0,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("Should not be able to pass in deposit money validator if value is more than R$ 2.000,00", async () => {
      const response = await request(app)
        .post("/api/account/deposit")
        .send({
          depositValue: 2500.0,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("Transfer money validator", () => {
    it("Should not be able to pass in transfer money validator if not pass transfer value", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "444.333.222-11",
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toBe("transfer value required");
    });

    it("Should not be able to pass in transfer money validator if not pass cpf", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          transferValue: 10,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toBe("cpf to transfer is required");
    });

    it("Should not be able to pass in transfer money validator if cpf format is invalid", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          transferValue: 10,
          cpfToTransfer: "123.123.123.12",
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toBe("invalid cpf format");
    });

    it("Should not be able to pass in transfer money validator if transfer value is less than R$ 1,00", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "444.333.222-11",
          transferValue: 0,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toBe("min deposit value is R$ 1,00");
    });
  });
});
