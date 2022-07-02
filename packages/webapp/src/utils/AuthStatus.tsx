import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";

const AuthStatus = () => {
  const authContext = useContext(AuthContext);

  const signout = () => {
    authContext.setToken(undefined);
    console.log("logged out!");
  };

  return (
    <>
      {authContext.token ? (
        <p>Logged in!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </>
  );
};
export default AuthStatus;
