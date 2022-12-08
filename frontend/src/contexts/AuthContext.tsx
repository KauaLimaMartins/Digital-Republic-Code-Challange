import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { api } from "../services/api";

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [account, setAccount] = useState<IAccount | null>(null);

  async function signIn(fullName: string, cpf: string) {
    const { data } = await api.post<IAccount>("/login", {
      full_name: fullName,
      cpf,
    });

    setCookie(undefined, "auth-token", data.token, {
      maxAge: 86400, // 24 Hours in seconds
    });

    // Update axios header token
    api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

    setAccount({ token: data.token, full_name: data.full_name });

    setTimeout(() => {
      Router.push("/");
    }, 1000);
  }

  return (
    <AuthContext.Provider
      value={{
        account,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
