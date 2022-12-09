import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import HomePage from "../../src/pages";

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

describe("Home Page", () => {
  it("Should render correctly", () => {
    render(<HomePage account={{ full_name: "test user", balance: 50 }} />);

    expect(screen.getByText("Bem vindo, test user!")).toBeInTheDocument();
    expect(screen.getByText("R$ 50,00")).toBeInTheDocument();
  });
});
