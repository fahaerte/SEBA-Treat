import React, { useCallback, useEffect, useState } from "react";
import MealOfferService from "../../services/mealOffer.service";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { ReceivedMealReservation } from "../../components/MealOfferRequest/ReceivedMealReservation";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import styled from "styled-components";

// TODO: use theme or maybe even create a component
const MainDivider = styled.hr`
  border: none;
  border-top: 1px dashed #cfcfcf;
  color: #fff;
  background-color: #fff;
  height: 1px;
`;

export const ReceivedMealOfferRequests = () => {
  const [receivedMealOfferRequests, setReceivedMealOfferRequests] = useState<
    MealOffer[]
  >([]);

  const fetchData = useCallback(async () => {
    const data = await MealOfferService.getReceivedMealOfferRequests();
    setReceivedMealOfferRequests(data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div className={"mt-4"}>
      {receivedMealOfferRequests.map((mealOffer, index) => {
        return (
          <div key={index}>
            <MealOfferRequest mealOffer={mealOffer}>
              {mealOffer.reservations.map((reservation, index) => {
                const receivedMealReservation = (
                  <ReceivedMealReservation
                    mealOfferId={mealOffer._id}
                    reservation={reservation}
                    buyerRating={
                      mealOffer.rating === undefined
                        ? undefined
                        : mealOffer.rating.buyerRating
                    }
                  />
                );
                if (index != mealOffer.reservations.length - 1) {
                  return (
                    <div className={"p-0 m-0"} key={index}>
                      {receivedMealReservation}
                      <MainDivider />
                    </div>
                  );
                } else {
                  return receivedMealReservation;
                }
              })}
            </MealOfferRequest>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
