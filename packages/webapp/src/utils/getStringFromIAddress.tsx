import {IAddress, IAddressLandingPage} from "@treat/lib-common";

export const getStringFromIAddress = (input: IAddress) => {
  let address = input.street;
  address = address.concat(" ", input.houseNumber);
  address = address.concat(" ", input.postalCode);
  address = address.concat(" ", input.city);
  return address;
};
