import React, {useCallback, useEffect, useState} from "react";
import MealOfferService from "../services/mealOffer.service";
import {MealOfferRequest} from "../components/MealOfferRequest/MealOfferRequest";
import {ReceivedMealReservation} from "../components/MealOfferRequest/ReceivedMealReservation";
import MealOffer from "../types/interfaces/mealOffer.interface";
import styled from "styled-components";

export const ReceivedMealOfferRequests = () => {

    const MainDivider = styled.hr`
      border: none;
      border-top: 1px dashed #CFCFCF;
      color: #fff;
      background-color: #fff;
      height: 1px;
    `;

    const [receivedMealOfferRequests, setReceivedMealOfferRequests] = useState(
        [] as MealOffer[]
    );

    const fetchData = useCallback(async () => {
        const data = await MealOfferService.getReceivedMealOfferRequests();
        console.log(data);
        setReceivedMealOfferRequests(data);
    }, []);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    return (
        <div>
            {receivedMealOfferRequests.map((mealOffer, index) => {
                return (
                    <div key={index}>
                        <MealOfferRequest mealOffer={mealOffer}>
                            {mealOffer.reservations.map((reservation, index) => {
                                if (index !== mealOffer.reservations.length - 1) {
                                    return (
                                        <div className={"p-0 m-0"} key={index}>
                                            <ReceivedMealReservation
                                                mealOfferId={mealOffer._id}
                                                reservation={reservation}
                                            />
                                            <MainDivider/>
                                        </div>
                                    );
                                } else {
                                    return (<ReceivedMealReservation
                                        mealOfferId={mealOffer._id}
                                        reservation={reservation}
                                    />);
                                }
                            })}
                        </MealOfferRequest>
                        <hr/>
                    </div>
                );
            })}
        </div>
    );
};
