import React, {useCallback, useEffect, useState} from "react";
import MealOfferService from "../services/mealOffer.service";
import {MealOfferRequest} from "../components/MealOfferRequest/MealOfferRequest";
import {ReceivedMealReservation} from "../components/MealOfferRequest/ReceivedMealReservation";
import MealOffer from "../types/interfaces/mealOffer.interface";

export const ReceivedMealOfferRequests = () => {

    const [receivedMealOfferRequests, setReceivedMealOfferRequests] = useState([] as MealOffer[])

    const fetchData = useCallback(async () => {
        const data = await MealOfferService.getReceivedMealOfferRequests();
        console.log(data);
        setReceivedMealOfferRequests(data);
    }, []);

    useEffect(() => {
        fetchData()
            .catch(console.error);
    }, [fetchData]);

    return (
        <div>
            {receivedMealOfferRequests.map((mealOffer, index) => {
                return <div key={index}>
                    <MealOfferRequest mealOffer={mealOffer}>
                        {
                            mealOffer.reservations.map((reservation, index) => {
                                return <ReceivedMealReservation key={index} mealOfferId={mealOffer._id}
                                                                reservation={reservation}/>
                            })
                        }
                    </MealOfferRequest>
                    <hr/>
                </div>
            })}
        </div>
    )
}