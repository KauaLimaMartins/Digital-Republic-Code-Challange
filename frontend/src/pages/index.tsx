import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { MdExitToApp } from "react-icons/md";

import { DepositMoneyModal } from "../components/DepositMoneyModal";
import { SimpleButton } from "../components/SimpleButton";
import { TransferMoneyModal } from "../components/TransferMoneyModal";

import { getAPIClient } from "../services/axios";
import { convertBalanceToBRL } from "../utils/convertBalanceToBRL";

interface IHomePageProps {
  account: IAccountInfos;
}

export default function HomePage({ account }: IHomePageProps) {
  const router = useRouter();
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);

  return (
    <>
      <Head>
        <title>Início</title>
      </Head>

      {isOpenDepositModal && (
        <DepositMoneyModal
          account={account}
          handleClose={() => setIsOpenDepositModal(false)}
        />
      )}

      {isOpenTransferModal && (
        <TransferMoneyModal
          account={account}
          handleClose={() => setIsOpenTransferModal(false)}
        />
      )}

      <main className="h-screen bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div className="bg-white p-8 border rounded-xl">
            <div>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl mb-2 text-gray-800 mr-4">
                  Bem vindo, {account.full_name}!
                </h1>

                <button
                  className="text-red-600"
                  title="Sair da conta"
                  onClick={() => {
                    document.cookie.split(";").forEach(function (c) {
                      document.cookie = c
                        .replace(/^ +/, "")
                        .replace(
                          /=.*/,
                          "=;expires=" + new Date().toUTCString() + ";path=/"
                        );
                    });

                    router.reload();
                  }}
                >
                  <MdExitToApp size={22} />
                </button>
              </div>

              <span className="text-lg text-gray-800">
                Saldo atual:{" "}
                <span className="font-medium">
                  {convertBalanceToBRL(account.balance)}{" "}
                </span>
              </span>
            </div>
            <div className="mt-8">
              <h2 className="mb-2 font-medium text-gray-800">Ações</h2>
              <SimpleButton
                type="button"
                style={{ marginRight: 20 }}
                handleClick={() => setIsOpenDepositModal(true)}
              >
                Depositar dinheiro
              </SimpleButton>

              <SimpleButton
                type="button"
                handleClick={() => setIsOpenTransferModal(true)}
              >
                Transferir dinheiro
              </SimpleButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "auth-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const apiClient = getAPIClient(ctx);

  let accountInfo = {
    full_name: "",
    balance: 0,
  };

  try {
    const { data } = await apiClient.get<IAccountInfos>("/account");

    accountInfo = data;
  } catch (error) {}

  return {
    props: {
      account: accountInfo,
    },
  };
};
