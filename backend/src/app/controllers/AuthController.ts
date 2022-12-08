import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { authConfig } from "../../config/authConfig";

import { prisma } from "../../database/client";

interface AuthRequest {
  full_name: string;
  cpf: string;
}

class AuthController {
  public async registerAccount(req: Request, res: Response) {
    const { full_name, cpf } = req.body as AuthRequest;

    try {
      const account = await prisma.account.create({
        data: {
          full_name,
          cpf,
        },
      });

      return res.json({ full_name: account.full_name });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(400).json({ error: "cpf already exists" });
        }
      }

      return res
        .status(400)
        .json({ error: `Failed to create account. ${err}` });
    }
  }

  public async loginAccount(req: Request, res: Response) {
    const { full_name, cpf } = req.body as AuthRequest;

    try {
      const account = await prisma.account.findFirst({
        where: {
          full_name,
          cpf,
        },
      });

      if (!account) {
        return res.status(404).json({ error: `full name or cpf invalid` });
      }

      const token = jwt.sign(
        { account: { id: account.id } },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      );

      return res.json({
        token,
        full_name: account.full_name,
      });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(400).json({ error: `Failed to create jwt. ${err}` });
      }

      return res.status(400).json({ error: `Failed to login account. ${err}` });
    }
  }
}

export default new AuthController();
