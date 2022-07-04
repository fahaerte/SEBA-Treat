import React from "react";

export const AuthContext = React.createContext<{
  token?: string;
  setToken: (token: string | undefined) => void;
}>({ setToken: () => undefined });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | undefined>();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
