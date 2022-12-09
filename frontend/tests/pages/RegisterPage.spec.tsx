import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

import RegisterPage from "../../src/pages/register";

jest.mock("nookies", () => {
  return {
    parseCookies: (
      ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    ) => {
      return {
        "auth-token": "token-mock",
      };
    },
  };
});

jest.mock("next/router", () => {
  return {
    useRouter() {},
  };
});

describe("Register Page", () => {
  it("Should render correctly", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Já tem uma conta?")).toBeInTheDocument();
  });
});
