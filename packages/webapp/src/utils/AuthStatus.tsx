import React, {useContext} from "react";
import {UserContext} from "../utils/AuthProvider";
import Button from "../components/Button/Button";

const AuthStatus = () => {
    const userContext = useContext(UserContext);

    const signout = () => {
        userContext.setToken(undefined);
        userContext.setUser(undefined);
        userContext.setAddress(undefined);
        console.log("logged out!");
    };

    return (
        <>
            <div>
            {userContext.token ? (
                <div>
                    <p>Logged in! </p>
                    <p>{userContext.user?.email}</p>
                    <p>{userContext.token}</p>
                    <Button onClick={signout}>Sign Out</Button>
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
