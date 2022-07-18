import React, { useEffect } from "react";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { SentMealReservation } from "../../components/MealOfferRequest/SentMealReservation";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import { useQuery, useQueryClient } from "react-query";
import { getSentMealOfferRequests } from "../../api/mealApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

export const SentMealOfferRequests = () => {
  const queryKey = "sentMealOfferRequests";

  const { token } = useAuthContext();

  const { data: requests } = useQuery(queryKey, () =>
    getSentMealOfferRequests(token as string)
  );

  return (
    <div className={"mt-4"}>
      {requests &&
        requests.data.slice().map((mealOffer: MealOffer, index: number) => {
          return (
            <div key={index}>
              <MealOfferRequest mealOffer={mealOffer}>
                {mealOffer.reservations.slice().map((reservation, index) => {
                  return (
                    <SentMealReservation
                      key={index}
                      mealOfferId={mealOffer._id ? mealOffer._id : "no id"}
                      sellerId={
                        mealOffer.user ? mealOffer.user._id : "userdoesntExist"
                      }
                      sellerFirstName={
                        mealOffer.user
                          ? mealOffer.user.firstName
                          : "userdoesntExist"
                      }
                      sellerLastName={
                        mealOffer.user
                          ? mealOffer.user.lastName
                          : "userdoesntExist"
                      }
                      sellerMeanRating={
                        mealOffer.user ? mealOffer.user.meanRating : 0
                      }
                      reservation={reservation}
                      sellerRating={
                        mealOffer.rating === undefined
                          ? undefined
                          : mealOffer.rating.sellerRating
                      }
                    />
                  );
                })}
              </MealOfferRequest>
              <hr />
            </div>
          );
        })}
    </div>
  );
};
