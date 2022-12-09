import { render, screen } from "@testing-library/react";
import { CPFInput } from "../../src/components/CPFInput";

describe("CPFInput Component", () => {
  it("Should renders correctly", () => {
    render(<CPFInput value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
  });

  it("Should set input value with CPF mask", () => {
    render(<CPFInput value="44433322211" onChange={() => {}} />);

    const maskInput: HTMLInputElement = screen.getByPlaceholderText("CPF");

    expect(maskInput.value).toBe("444.333.222-11");
  });
});
