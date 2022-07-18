import { Client, LatLngString } from "@googlemaps/google-maps-services-js";
import { IAddress } from "@treat/lib-common/lib/interfaces/IAddress";
import HttpException from "./exceptions/http.exception";
import Logger, { ILogMessage } from "./logger";

export const getDistanceBetweenAddressesInKm = async (
  address1: string,
  address2: string
): Promise<number> => {
  const client = new Client({});
  const { GOOGLE_MAPS_API_KEY } = process.env;
  const response = await client.distancematrix({
    params: {
      origins: [address1] as LatLngString[],
      destinations: [address2] as LatLngString[],
      key: GOOGLE_MAPS_API_KEY as string,
    },
  });
  if (response.status != 200) {
    Logger.error({
      functionName: "getDistanceBetweenAddressesInKm",
      message: "Couldn't calculate distance",
      details: response,
    } as ILogMessage);
    throw new HttpException(500, "Couldn't calculate the distance!");
  }
  return Number(response.data.rows[0].elements[0].distance.value) / 1000;
};

export const getUserAddressString = (address: IAddress): string => {
  return `${address.street} ${address.houseNumber} ${address.postalCode} ${address.city} ${address.country}`;
};
