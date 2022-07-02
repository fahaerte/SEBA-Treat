import React from "react";
import {IAddressLandingPage} from "@treat/lib-common/lib/interfaces/_index";

export const AddressContext = React.createContext<{
    address?: IAddressLandingPage;
    setAddress: (address: IAddressLandingPage) => void;
}>({ setAddress: () => undefined });

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
    const [address, setAddress] = React.useState<IAddressLandingPage | undefined>();

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    );
};