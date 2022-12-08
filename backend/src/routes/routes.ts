import { Router } from "express";

import { authMiddleware } from "../app/middlewares/authMiddleware";
import { validate } from "../app/middlewares/validateMiddleware";

import { authValidator } from "../app/validators/authValidator";
import {
  depositMoneyValidator,
  transferMoneyValidator,
} from "../app/validators/accountValidator";

import AccountController from "../app/controllers/AccountController";
import AuthController from "../app/controllers/AuthController";

const routes = Router();

routes.post("/api/login", validate(authValidator), AuthController.loginAccount);
routes.post(
  "/api/register",
  validate(authValidator),
  AuthController.registerAccount
);

// The routes below this middleware need authentication to be accessed
routes.use(authMiddleware);

routes.get("/api/account", AccountController.getAccountInfos);
routes.post(
  "/api/account/deposit",
  validate(depositMoneyValidator),
  AccountController.depositMoney
);
routes.post(
  "/api/account/transfer",
  validate(transferMoneyValidator),
  AccountController.transferMoney
);

export { routes };
