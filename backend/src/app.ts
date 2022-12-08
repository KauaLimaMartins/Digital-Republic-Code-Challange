import express from "express";
import cors from "cors";

import { routes } from "./routes/routes";

import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(routes);

export { app };
