import React, {useContext} from "react";
import {AuthContext} from "./AuthProvider";
import {Navigate} from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";

export const RequireAuthRoute = ({ path }: { path: string }) => {
    const authContext = useContext(AuthContext);

    return (
        <>
            {authContext.token ?
                <Navigate to={path}/>
                : <Navigate to={"/login"}/>
            }
        </>
    );
};
