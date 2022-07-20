import React from "react";
import { MealOfferRequest } from "../../components/MealOfferRequest/MealOfferRequest";
import { ReceivedMealReservation } from "../../components/MealOfferRequest/ReceivedMealReservation";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getReceivedMealOfferRequests } from "../../api/mealApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

// TODO: use theme or maybe even create a component
const MainDivider = styled.hr`
  border: none;
  border-top: 1px dashed #cfcfcf;
  color: #fff;
  background-color: #fff;
  height: 1px;
`;

export const ReceivedMealOfferRequests = () => {
  const queryKey = "receivedMealOfferRequests";

  const { token } = useAuthContext();

  const { data: requests } = useQuery(
    queryKey,
    () => getReceivedMealOfferRequests(token as string),
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );

  return (
    <div className={"mt-4"}>
      {requests &&
        requests.data.slice().map((mealOffer: MealOffer, index: number) => {
          return (
            <div key={index}>
              <MealOfferRequest mealOffer={mealOffer}>
                {mealOffer.reservations.slice().map((reservation, index) => {
                  const receivedMealReservation = (
                    <ReceivedMealReservation
                      mealOfferId={mealOffer._id}
                      reservation={reservation}
                      sellerRating={
                        mealOffer.rating
                          ? mealOffer.rating.sellerRating
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
