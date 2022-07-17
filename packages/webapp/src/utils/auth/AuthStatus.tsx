import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const AuthStatus = () => {
  const userContext = useContext(AuthContext);
  // const navigate = useNavigate();
  //
  // const signout = () => {
  //   userContext.setToken(undefined);
  //   userContext.setUserId(undefined);
  //   userContext.setAddress(undefined);
  //   console.log("logged out!");
  //   navigate("/");
  // };

  return (
    <>
      <div>
        {userContext.token ? (
          <div>
            <p>Logged in! </p>
            {/*<Button onClick={signout}>Sign Out</Button>*/}
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
        {userContext.address ? (
          <p>{userContext.address}</p>
        ) : (
          <p>No address in context</p>
        )}
      </div>
    </>
  );
};
export default AuthStatus;
