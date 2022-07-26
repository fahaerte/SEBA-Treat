import { Client, LatLngString } from "@googlemaps/google-maps-services-js";
import { IAddress } from "@treat/lib-common/lib/interfaces/IAddress";
import HttpException from "./exceptions/http.exception";
import Logger, { ILogMessage } from "./logger";

export const getDistancesBetweenAddressesInKm = async (
  originAddress: string,
  destinations: string[]
): Promise<number[]> => {
  const client = new Client({});
  const { GOOGLE_MAPS_API_KEY } = process.env;
  const response = await client.distancematrix({
    params: {
      origins: [originAddress] as LatLngString[],
      destinations: destinations,
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
  return Array.from(response.data.rows[0].elements, (element) =>
    Math.ceil(element.distance.value / 1000)
  );
};

export const getDistanceBetweenAddressesInKm = async (
  address1: string,
  address2: string
): Promise<number> => {
  const distances = await getDistancesBetweenAddressesInKm(address1, [
    address2,
  ]);
  return distances[0];
};

export const getUserAddressString = (address: IAddress): string => {
  return `${address.street} ${address.houseNumber} ${address.postalCode} ${address.city} ${address.country}`;
};
