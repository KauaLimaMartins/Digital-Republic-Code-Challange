import { Request, Response } from "express";
import { prisma } from "../../database/client";

interface DepositMoneyRequest {
  depositValue: number;
}

interface TransferMoneyRequest {
  cpfToTransfer: string;
  transferValue: number;
}

class AccountController {
  public async getAccountInfos(req: Request, res: Response) {
    const { id } = req.account;

    try {
      const account = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      if (!account) {
        return res
          .status(404)
          .json({ error: "Authenticated account not found" });
      }

      return res.status(200).json({
        full_name: account.full_name,
        balance: account.balance,
      });
    } catch (err) {
      return res.status(400).json({ error: `Failed to deposit value. ${err}` });
    }
  }

  public async depositMoney(req: Request, res: Response) {
    const { id } = req.account;

    const { depositValue } = req.body as DepositMoneyRequest;

    try {
      const account = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      if (!account) {
        return res.status(404).json({ error: "Logged account not found" });
      }

      const newBalanceValue = account.balance + depositValue;

      const updateAccount = await prisma.account.update({
        where: {
          id,
        },
        data: {
          balance: newBalanceValue,
        },
      });

      if (!updateAccount) {
        return res.status(404).json({ error: "Failed to add deposit" });
      }

      return res.status(200).json({
        currentBalance: newBalanceValue,
      });
    } catch (err) {
      return res.status(400).json({ error: `Failed to deposit value. ${err}` });
    }
  }

  public async transferMoney(req: Request, res: Response) {
    const { id } = req.account;

    const { cpfToTransfer, transferValue } = req.body as TransferMoneyRequest;

    try {
      const loggedAccount = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      if (!loggedAccount) {
        return res.status(404).json({ error: "Logged account not found" });
      }

      if (cpfToTransfer === loggedAccount.cpf) {
        return res.status(401).json({
          error: "you can not transfer money to yourself",
        });
      }

      if (transferValue > loggedAccount.balance) {
        return res.status(401).json({
          error: "you do not have enough balance to transfer this amount",
        });
      }

      const accountToTransfer = await prisma.account.findFirst({
        where: {
          cpf: cpfToTransfer,
        },
      });

      if (!accountToTransfer) {
        return res.status(404).json({ error: "Account to transfer not found" });
      }

      const newLoggedAccountBalance = loggedAccount.balance - transferValue;
      const newAccountToTrasferBalance =
        accountToTransfer.balance + transferValue;

      const updateLoggedAccount = await prisma.account.update({
        where: {
          id,
        },
        data: {
          balance: newLoggedAccountBalance,
        },
      });

      if (!updateLoggedAccount) {
        return res.status(404).json({ error: "Failed to transfer money" });
      }

      const updateAccountToTransfer = await prisma.account.update({
        where: {
          cpf: cpfToTransfer,
        },
        data: {
          balance: newAccountToTrasferBalance,
        },
      });

      if (!updateAccountToTransfer) {
        return res
          .status(404)
          .json({ error: "Failed to add money in account" });
      }

      return res.status(200).json({ currentBalance: newLoggedAccountBalance });
    } catch (err) {
      return res
        .status(400)
        .json({ error: `Failed to transfer money. ${err}` });
    }
  }
}

export default new AccountController();
