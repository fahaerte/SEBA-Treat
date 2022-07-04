import React from "react";
import { IUser } from "@treat/lib-common";

export const AuthContext = React.createContext<{
  token?: string;
  setToken: (token: string | undefined) => void;
}>({ setToken: () => undefined });

export const UserContext = React.createContext<{
  user?: IUser;
  setUser: (user: IUser | undefined) => void;
}>({ setUser: () => undefined });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | undefined>();
  const [user, setUser] = React.useState<IUser | undefined>();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
