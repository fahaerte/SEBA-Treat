import React from "react";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { ReceivedMealReservation } from "../../components/MealOfferRequest/ReceivedMealReservation";
import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getReceivedMealOfferRequests,
  PopulatedReservations,
} from "../../api/mealApi";
import { IMealOffer } from "@treat/lib-common";

// TODO: use theme or maybe even create a component
const MainDivider = styled.hr`
  border: none;
  border-top: 1px dashed #cfcfcf;
  color: #fff;
  background-color: #fff;
  height: 1px;
`;

interface IMealOfferPopulated extends Omit<IMealOffer, "reservations"> {
  reservations: PopulatedReservations[];
}
export const ReceivedMealOfferRequests = () => {
  const queryKey = "receivedMealOfferRequests";

  const { data: requests } = useQuery(
    queryKey,
    () => getReceivedMealOfferRequests(),
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );

  return (
    <div className={"mt-4"}>
      {requests &&
        requests.data
          .slice()
          .map((mealOffer: IMealOfferPopulated, index: number) => {
            return (
              <div key={index}>
                <MealOfferRequest mealOffer={mealOffer}>
                  {mealOffer.reservations.slice().map((reservation, index) => {
                    const receivedMealReservation = (
                      <ReceivedMealReservation
                        key={index}
                        mealOfferId={mealOffer._id}
                        reservation={reservation}
                        buyerRating={
                          mealOffer.rating
                            ? mealOffer.rating.buyerRating
                            : undefined
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
