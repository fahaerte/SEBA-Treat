import React, { useCallback, useEffect, useState } from "react";
import MealOfferService from "../../services/mealOffer.service";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { SentMealReservation } from "../../components/MealOfferRequest/SentMealReservation";
import MealOffer from "../../types/interfaces/mealOffer.interface";

export const SentMealOfferRequests = () => {
  const [sentMealOfferRequests, setSentMealOfferRequests] = useState(
    [] as MealOffer[]
  );

  const fetchData = useCallback(async () => {
    const data = await MealOfferService.getSentMealOfferRequests();
    console.log(data);
    setSentMealOfferRequests(data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div>
      {sentMealOfferRequests.map((mealOffer, index) => {
        return (
          <div key={index}>
            <MealOfferRequest mealOffer={mealOffer}>
              {mealOffer.reservations.map((reservation, index) => {
                return (
                  <SentMealReservation
                    key={index}
                    mealOfferId={mealOffer._id}
                    sellerId={mealOffer.user}
                    reservation={reservation}
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
