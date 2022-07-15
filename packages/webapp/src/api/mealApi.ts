import { baseApi } from "./baseApi";

export const getMealOffer = async (
  mealOfferId: string,
  token: string | undefined
) => {
  const response = await baseApi(token).get(`/mealOffers/${mealOfferId}`);
  return response.data;
};

export const getMealOffersByParams = async (
  address: string,
  token: string,
  portions?: string,
  category?: string,
  allergen?: string,
  sellerRating?: number,
  startDate?: string,
  endDate?: string,
  price?: number,
  search?: string,
  distance?: string
) => {
  const response = await baseApi(token).get(`/mealOffers/previews`, {
    params: {
      address: address,
      portions: portions,
      category: category,
      sellerRating: sellerRating,
      startDate: startDate,
      endDate: endDate,
      price: price,
      search: search,
      distance: distance,
    },
  });
  return response.data;
};
