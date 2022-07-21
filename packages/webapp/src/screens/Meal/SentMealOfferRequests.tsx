import React from "react";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { SentMealReservation } from "../../components/MealOfferRequest/SentMealReservation";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import { useQuery } from "react-query";
import { getSentMealOfferRequests } from "../../api/mealApi";

export const SentMealOfferRequests = () => {
  const queryKey = "sentMealOfferRequests";

  const { data: requests } = useQuery(queryKey, () =>
    getSentMealOfferRequests()
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
                      mealOfferId={mealOffer._id}
                      seller={mealOffer.user}
                      reservation={reservation}
                      sellerRating={
                        mealOffer.rating
                          ? mealOffer.rating.sellerRating
                          : undefined
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
