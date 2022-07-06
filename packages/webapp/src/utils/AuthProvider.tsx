import React from "react";
import { IAddressLandingPage, IUser } from "@treat/lib-common";

export const AuthContext = React.createContext<{
  token?: string;
  setToken: (token: string | undefined) => void;
  user?: IUser;
  setUser: (user: IUser | undefined) => void;
  address?: string;
  setAddress: (address: string | undefined) => void;
}>({
  setUser: () => undefined,
  setToken: () => undefined,
  setAddress: () => undefined,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | undefined>();
  const [user, setUser] = React.useState<IUser | undefined>();
  const [address, setAddress] = React.useState<string | undefined>();

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, address, setAddress }}
    >
      {children}
    </AuthContext.Provider>
  );
};
