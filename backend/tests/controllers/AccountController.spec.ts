/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../src/app";

describe("AccountController", () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await request(app).post("/api/login").send({
      full_name: "Kaua Lima",
      cpf: "111.222.333-44",
    });

    authToken = response.body.token;
  });

  describe("Deposit Money", () => {
    it("Should be able to deposit money and return balance after deposit", async () => {
      const response = await request(app)
        .post("/api/account/deposit")
        .send({
          depositValue: 100.5,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("currentBalance");
    });
  });

  describe("Transfer money", () => {
    it("Should be able to transfer money to another account", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "444.333.222-11",
          transferValue: 10.5,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("currentBalance");
    });

    it("Should not be able to transfer money with an unregistered cpf", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "012.712.123-83",
          transferValue: 10.5,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Account to transfer not found");
    });

    it("Should not be able to transfer money with an value more than he has in his balance", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "444.333.222-11",
          transferValue: 99999990,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "you do not have enough balance to transfer this amount"
      );
    });

    it("Should not be able to transfer money to yoursel", async () => {
      const response = await request(app)
        .post("/api/account/transfer")
        .send({
          cpfToTransfer: "111.222.333-44",
          transferValue: 50,
        })
        .set({
          Authorization: `Bearer ${authToken}`,
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(
        "you can not transfer money to yourself"
      );
    });
  });
});
