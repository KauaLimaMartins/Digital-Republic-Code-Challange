import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "../../config/authConfig";

interface TokenPayload {
  account: {
    id: string;
  };
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "you must be logged in to do this" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);

    const { account } = decoded as TokenPayload;

    req.account = account;

    return next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
}
