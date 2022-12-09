import { useState, FormEvent } from "react";
import { MdClose } from "react-icons/md";

import { api } from "../services/api";
import { CurrencyInput } from "./CurrencyInput";
import { Loading } from "./Loading";
import { SimpleButton } from "./SimpleButton";
import { SimpleToast } from "./SimpleToast";

interface IDepositMoneyModalProps {
  handleClose: () => void;
  account: IAccountInfos;
}

interface IDepositMoneyResponse {
  currentBalance: number;
}

export function DepositMoneyModal({
  handleClose,
  account,
}: IDepositMoneyModalProps) {
  const [depositValue, setDepositValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<"warn" | "error" | "success">(
    "error"
  );

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formattedDeposit = parseFloat(
      depositValue.replace("R$ ", "").replace(".", "").replace(",", ".")
    );

    if (formattedDeposit > 2000) {
      setToastText("Não é possível depositar um valor maior que R$ 2.000,00");
      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return;
    }

    if (formattedDeposit < 1) {
      setToastText("Não é possível depositar um valor menor que R$ 1,00");
      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post<IDepositMoneyResponse>(
        "/account/deposit",
        {
          depositValue: formattedDeposit,
        }
      );

      account.balance = data.currentBalance;

      setIsLoading(false);

      setToastText("Valor depositado com sucesso!");
      setToastType("success");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        handleClose();
      }, 2000);
    } catch (err) {
      setIsLoading(false);

      setToastText("Erro ao depositar valor");
      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }

  return (
    <>
      {isLoading && <Loading />}

      {showToast && (
        <SimpleToast
          text={toastText}
          type={toastType}
          handleClose={() => setShowToast(false)}
        />
      )}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="flex items-start justify-between p-4 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-900">
                Depositar dinheiro
              </h3>
              <button
                className="p-1 ml-auto border-0 float-right outline-none"
                onClick={handleClose}
              >
                <MdClose size={26} />
              </button>
            </div>

            <form
              className="relative p-4 flex-auto flex flex-col items-center"
              onSubmit={handleSubmitForm}
            >
              <p className="text-lg text-gray-900 text-center">
                Quanto você deseja depositar?
              </p>
              <p className="text-sm mb-3 text-gray-900 text-center">
                Obs: Não é permitido depositar valores maiores que R$2.000,00
                nem valores menores que R$ 1,00
              </p>

              <CurrencyInput
                onChange={(e) => setDepositValue(e.target.value)}
                value={depositValue}
              />

              <SimpleButton type="submit" style={{ marginTop: 20 }}>
                Depositar valor
              </SimpleButton>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
