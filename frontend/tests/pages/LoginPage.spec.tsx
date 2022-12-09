import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

import LoginPage from "../../src/pages/login";

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

describe("Login Page", () => {
  it("Should render correctly", () => {
    render(<LoginPage />);

    expect(screen.getByText("Fazer login")).toBeInTheDocument();
  });
});
