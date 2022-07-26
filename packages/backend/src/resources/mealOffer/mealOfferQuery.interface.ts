import { EMealCategory } from "@treat/lib-common/lib/enums/EMealCategory";
import { EMealAllergen } from "@treat/lib-common/lib/enums/EMealAllergen";

export interface MealOfferQuery {
  distance: number;
  address: string;
  category?: EMealCategory[];
  allergen?: EMealAllergen[];
  portions?: number;
  sellerRating?: number;
  startDate?: Date;
  endDate?: Date;
  price?: number;
  search?: string;
  page: number;
  pageLimit: number;
  sortingRule?: string;
}
