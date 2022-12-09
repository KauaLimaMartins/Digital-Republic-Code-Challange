import { render, screen, fireEvent } from "@testing-library/react";

import { DepositMoneyModal } from "../../src/components/DepositMoneyModal";
import { api } from "../../src/services/api";

jest.mock("../../src/services/api");

describe("DepositMoneyModal Component", () => {
  it("Should renders correctly", () => {
    render(
      <DepositMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    expect(
      screen.getByText("Quanto você deseja depositar?")
    ).toBeInTheDocument();
  });

  it("Should open toast if deposit value is more than R$ 2.000,00", () => {
    render(
      <DepositMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    const depositButton: HTMLButtonElement =
      screen.getByText("Depositar valor");
    const depositInput: HTMLInputElement = screen.getByPlaceholderText("Valor");

    fireEvent.change(depositInput, { target: { value: "30000" } });

    expect(depositInput.value).toBe("R$ 30.000");

    fireEvent.click(depositButton);

    expect(
      screen.getByText(
        "Não é possível depositar um valor maior que R$ 2.000,00"
      )
    ).toBeInTheDocument();
  });

  it("Should open toast if deposit value is less than R$ 1,00", () => {
    render(
      <DepositMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    const depositButton: HTMLButtonElement =
      screen.getByText("Depositar valor");
    const depositInput: HTMLInputElement = screen.getByPlaceholderText("Valor");

    fireEvent.change(depositInput, { target: { value: "0" } });

    expect(depositInput.value).toBe("R$ 0");

    fireEvent.click(depositButton);

    expect(
      screen.getByText("Não é possível depositar um valor menor que R$ 1,00")
    ).toBeInTheDocument();
  });

  it("Should open a toast if api throws an error", () => {
    render(
      <DepositMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    const apiPostMocked = jest.mocked(api.post);

    apiPostMocked.mockImplementation(() => {
      throw new Error();
    });

    const depositButton: HTMLButtonElement =
      screen.getByText("Depositar valor");
    const depositInput: HTMLInputElement = screen.getByPlaceholderText("Valor");

    fireEvent.change(depositInput, { target: { value: "40" } });

    expect(depositInput.value).toBe("R$ 40");

    fireEvent.click(depositButton);

    expect(screen.getByText("Erro ao depositar valor")).toBeInTheDocument();
  });
});
