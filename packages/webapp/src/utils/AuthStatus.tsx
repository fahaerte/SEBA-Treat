import React, { useContext } from "react";
import { UserContext } from "../utils/AuthProvider";
import Button from "../components/Button/Button";

const AuthStatus = () => {
  const userContext = useContext(UserContext);

  const signout = () => {
    userContext.setToken(undefined);
    console.log("logged out!");
  };

  return (
    <>
      {userContext.token ? (
        <div>
          <p>Logged in!</p>
          <Button onClick={signout}>Sign Out</Button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </>
  );
};
export default AuthStatus;
