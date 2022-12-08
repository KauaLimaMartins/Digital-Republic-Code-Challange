interface IAccountInfos {
  full_name: string;
  balance: number;
}

interface IAccount {
  token: string;
  full_name: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  account: IAccount | null;
  signIn: (email: string, password: string) => Promise<void>;
}
