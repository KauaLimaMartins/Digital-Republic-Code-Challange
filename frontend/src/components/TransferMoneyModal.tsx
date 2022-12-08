import { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../services/api";
import { CPFInput } from "./CPFInput";
import { CurrencyInput } from "./CurrencyInput";
import { Loading } from "./Loading";
import { SimpleButton } from "./SimpleButton";
import { SimpleToast } from "./SimpleToast";

interface ITransferMoneyModalProps {
  handleClose: () => void;
  account: IAccountInfos;
}

interface ITransferMoneyResponse {
  currentBalance: number;
}

export function TransferMoneyModal({
  handleClose,
  account,
}: ITransferMoneyModalProps) {
  const [transferValue, setTransferValue] = useState("");
  const [cpfValue, setCpfValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<"warn" | "error" | "success">(
    "error"
  );

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formattedDeposit = parseFloat(
      transferValue.replace("R$ ", "").replace(".", "").replace(",", ".")
    );

    if (formattedDeposit < 1) {
      setToastText("Não é possível transferir um valor menor que R$ 1,00");
      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return;
    }

    if (formattedDeposit > account.balance) {
      setToastText("Você  não tem saldo suficiente para transferir esse valor");
      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post<ITransferMoneyResponse>(
        "/account/transfer",
        {
          cpfToTransfer: cpfValue,
          transferValue: formattedDeposit,
        }
      );

      account.balance = data.currentBalance;

      setIsLoading(false);

      setToastText("Valor transferido com sucesso!");
      setToastType("success");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        handleClose();
      }, 2000);
    } catch (err) {
      setIsLoading(false);

      setToastText("Erro ao transferir valor");

      if (err instanceof AxiosError) {
        if (err.response?.data.error === "Account to transfer not found") {
          setToastText("CPF não cadastrado");
        }
      }

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
                Transferir dinheiro
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
                Para quem você deseja depositar?
              </p>
              <p className="text-sm mb-3 text-gray-900 text-center">
                Obs: as transferências não tem valor máximo, mas não podem ser
                valores menores que R$ 1,00
              </p>

              <CPFInput
                onChange={(e) => setCpfValue(e.target.value)}
                value={cpfValue}
                style={{ marginBottom: 10 }}
              />
              <CurrencyInput
                onChange={(e) => setTransferValue(e.target.value)}
                value={transferValue}
              />

              <SimpleButton type="submit" style={{ marginTop: 20 }}>
                Transferir valor
              </SimpleButton>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
