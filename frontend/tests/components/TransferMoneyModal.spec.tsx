import { fireEvent, render, screen } from "@testing-library/react";

import { TransferMoneyModal } from "../../src/components/TransferMoneyModal";

describe("TransferMoneyModal Component", () => {
  it("Should renders correctly", () => {
    render(
      <TransferMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    expect(
      screen.getByText("Para quem você deseja transferir?")
    ).toBeInTheDocument();
  });

  it("Should open toast if deposit value is less than R$ 1,00", () => {
    render(
      <TransferMoneyModal
        account={{ full_name: "teste", balance: 10 }}
        handleClose={() => {}}
      />
    );

    const transferButton: HTMLButtonElement =
      screen.getByText("Transferir valor");
    const transferInput: HTMLInputElement =
      screen.getByPlaceholderText("Valor");

    fireEvent.change(transferInput, { target: { value: "0" } });

    expect(transferInput.value).toBe("R$ 0");

    fireEvent.click(transferButton);

    expect(
      screen.getByText("Não é possível transferir um valor menor que R$ 1,00")
    ).toBeInTheDocument();
  });

  it("Should open toast if user do not have enough balance", () => {
    render(
      <TransferMoneyModal
        account={{ full_name: "teste", balance: 100 }}
        handleClose={() => {}}
      />
    );

    const depositButton: HTMLButtonElement =
      screen.getByText("Transferir valor");
    const depositInput: HTMLInputElement = screen.getByPlaceholderText("Valor");

    fireEvent.change(depositInput, { target: { value: "200" } });

    expect(depositInput.value).toBe("R$ 200");

    fireEvent.click(depositButton);

    expect(
      screen.getByText(
        "Você não tem saldo suficiente para transferir esse valor"
      )
    ).toBeInTheDocument();
  });
});
