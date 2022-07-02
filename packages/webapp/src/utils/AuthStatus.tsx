import React, {useContext} from "react";
import {AuthContext} from "../utils/AuthProvider";
import Button from "../components/Button/Button";

const AuthStatus = () => {
    const authContext = useContext(AuthContext);

    const signout = () => {
        authContext.setToken(undefined);
        console.log("logged out!");
    };

    return (
        <>
            {authContext.token ?
                <div>
                    <p>Logged in!</p>
                    <Button onClick={signout}>Sign Out</Button>
                </div>
                : <p>You are not logged in.</p>}
        </>
    );
};
export default AuthStatus;
