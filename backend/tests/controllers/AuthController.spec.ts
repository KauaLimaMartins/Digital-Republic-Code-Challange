/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/database/client";

describe("AuthController", () => {
  describe("Register tests", () => {
    it("Should be able to register a new account and return id", async () => {
      const response = await request(app).post("/api/register").send({
        full_name: "test1",
        cpf: "000.000.000-00",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("full_name");
    });

    it("Should not be able to create an existing account", async () => {
      const response = await request(app).post("/api/register").send({
        full_name: "test2",
        cpf: "000.000.000-00",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("cpf already exists");
    });

    it("Should not be able to create an account with wrong types", async () => {
      const response = await request(app).post("/api/register").send({
        full_name: 1212,
        cpf: 123123123,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("Should not be able to create an account with wrong cpf format", async () => {
      const response = await request(app).post("/api/register").send({
        full_name: "test2",
        cpf: "123.456.789.00",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("Login tests", () => {
    it("Should be able to login account and return a jwt", async () => {
      const response = await request(app).post("/api/login").send({
        full_name: "test1",
        cpf: "000.000.000-00",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("full_name");
    });

    it("Should not be able to login account with wrong credentials", async () => {
      const response = await request(app).post("/api/login").send({
        full_name: "test1",
        cpf: "444.020.010-10",
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("full name or cpf invalid");
    });

    it("Should not be able to login account with wrong type", async () => {
      const response = await request(app).post("/api/login").send({
        full_name: 123,
        cpf: 444020010.1,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("Should not be able to login account with wrong format", async () => {
      const response = await request(app).post("/api/login").send({
        full_name: "test1",
        cpf: "444.020.010.10",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });

  afterAll(async () => {
    await prisma.account.delete({
      where: {
        cpf: "000.000.000-00",
      },
    });
  });
});
