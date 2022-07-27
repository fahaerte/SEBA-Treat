import { IAddress } from "@treat/lib-common";

export const getStringFromIAddress = (input: IAddress) =>
  `${input.street} ${input.houseNumber}, ${input.postalCode} ${input.city}`;
