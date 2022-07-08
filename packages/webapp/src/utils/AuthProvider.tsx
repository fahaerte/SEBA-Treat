import React from "react";
import { IAddressLandingPage, IUser } from "@treat/lib-common";

export const AuthContext = React.createContext<{
  token?: string;
  setToken: (token: string | undefined) => void;
  userId?: string;
  setUserId: (userId: string | undefined) => void;
  address?: string;
  setAddress: (address: string | undefined) => void;
}>({
  setUserId: () => undefined,
  setToken: () => undefined,
  setAddress: () => undefined,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  const [address, setAddress] = React.useState<string | undefined>();

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, token, setToken, address, setAddress }}
    >
      {children}
    </AuthContext.Provider>
  );
};
