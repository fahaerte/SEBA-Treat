import { IMealOffer } from "@treat/lib-common";
import { TOptionValuePair } from "../../components";

export default interface IMealOfferForm
  extends Omit<
    IMealOffer,
    "allergens" | "categories" | "_id" | "user" | "image"
  > {
  image: FileList;
  allergens: TOptionValuePair[];
  categories: TOptionValuePair[];
}
