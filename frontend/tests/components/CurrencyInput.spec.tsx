import { render, screen } from "@testing-library/react";
import { CurrencyInput } from "../../src/components/CurrencyInput";

describe("CurrencyInput Component", () => {
  it("Should renders correctly", () => {
    render(<CurrencyInput value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText("Valor")).toBeInTheDocument();
  });

  it("Should set input value with currency mask", () => {
    render(<CurrencyInput value="20000" onChange={() => {}} />);

    const maskInput: HTMLInputElement = screen.getByPlaceholderText("Valor");

    expect(maskInput.value).toBe("R$ 20.000");
  });
});
