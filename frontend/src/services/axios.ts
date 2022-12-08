import axios from "axios";
import { NextApiRequest, NextPageContext } from "next";
import { parseCookies } from "nookies";

type context =
  | Pick<NextPageContext, "req">
  | {
      req: NextApiRequest;
    }
  | {
      req: any;
    }
  | undefined;

export function getAPIClient(ctx?: context) {
  const { token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:4000/api",
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
