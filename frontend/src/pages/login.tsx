import { useContext, useState, FormEvent } from "react";
import { AxiosError } from "axios";
import Head from "next/head";
import Link from "next/link";

import { CPFInput } from "../components/CPFInput";
import { SimpleToast } from "../components/SimpleToast";
import { AuthContext } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { SimpleButton } from "../components/SimpleButton";
import { SimpleInput } from "../components/SimpleInput";

export default function LoginPage() {
  const { signIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<"warn" | "error" | "success">(
    "error"
  );

  const [fullNameValue, setFullNameValue] = useState("");
  const [cpfValue, setCpfValue] = useState("");

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await signIn(fullNameValue, cpfValue);
    } catch (err) {
      setIsLoading(false);

      setToastText("Erro ao fazer login");

      if (err instanceof AxiosError) {
        if (err.response?.data.error === "full name or cpf invalid") {
          setToastText("Nome ou CPF inválidos");
        }
      }

      setToastType("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading />}

      {showToast && (
        <SimpleToast
          text={toastText}
          type={toastType}
          handleClose={() => setShowToast(false)}
        />
      )}

      <main className="h-screen">
        <div className="h-full px-6 text-gray-800">
          <div className="h-full flex flex-wrap items-center justify-center xl:justify-center lg:justify-between">
            <div className="mb-12 shrink-1 grow-0 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
              <img
                src="/svg/login-illustration.svg"
                className="w-full"
                alt="Login image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmitForm}>
                <h2 className="text-3xl mb-6 capitalize font-medium">
                  Fazer login
                </h2>

                <div className="mb-4">
                  <SimpleInput
                    placeholder="Nome completo"
                    handleChange={(e) => setFullNameValue(e.target.value)}
                    value={fullNameValue}
                  />
                </div>

                <div className="mb-6">
                  <CPFInput
                    onChange={(e) => setCpfValue(e.target.value)}
                    value={cpfValue}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <SimpleButton type="submit">Login</SimpleButton>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Não tem uma conta?{" "}
                    <Link
                      href="/register"
                      className="text-cyan-600 hover:text-cyan-700 transition duration-150"
                    >
                      Registrar-se
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "auth-token": token } = parseCookies(ctx);

  // If user already has auth token, redirect to home page
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
