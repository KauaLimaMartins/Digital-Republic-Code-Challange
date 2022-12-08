import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError } from "yup";

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ errors: err.errors });
      }

      return res.status(400).json({ error: "Error to validate request" });
    }
  };
