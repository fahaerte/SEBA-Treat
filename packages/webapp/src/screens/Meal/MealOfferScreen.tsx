import React, { MouseEvent, useContext, useState } from "react";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { Col, Container, Row } from "../../components";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getMealOffersByParams } from "../../api/mealApi";
import { MealOfferScreenHeader } from "../../components/ui/Header/mealOfferScreenHeader";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import { IMealFilter, IMealOfferCard } from "@treat/lib-common";
import MealOffer from "../../components/MealOffers/MealOffer";
import { useNavigate } from "react-router-dom";
import MealOfferFilterTop from "../../components/MealOffers/MealOfferFilterTop";
import MealOfferFilterSide from "../../components/MealOffers/MealOfferFilterSide";

export const MealOfferScreen = () => {
  const { token, address, setAddress } = useAuthContext();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<IMealFilter>();

  const { data: offers, isLoading } = useQuery(
    "getOffers",
    () => getMealOffersByParams(address as string, token as string),
    {
      onSuccess: (response) => {
        console.log(offers);
      },
    }
  );

  const handleSearch = (search: string) => {
    console.log(search);
  };

  const handleSort = (sort: string) => {
    console.log(sort);
  };

  const handleFiltering = (filter: IMealFilter) => {
    console.log(filter);
  };

  return (
    <>
      <MealOfferScreenHeader />
      <Container className={""}>
        <Row>
          <Col className={"col col-lg-2"}>
            <Row>
              <MealOfferFilterSide
                currentFilter={filter as IMealFilter}
                handleFiltering={handleFiltering}
              />
            </Row>
          </Col>
          <Col>
            <Row>
              <MealOfferFilterTop
                handleSearch={handleSearch}
                handleSort={handleSort}
              />
            </Row>
            <Row>{offers ? offers.data.length : "No"} Offers found</Row>
            <Row>
              <Col>
                <Container>
                  {isLoading ? (
                    <LoadingPackages />
                  ) : (
                    <>
                      {offers &&
                        offers.data
                          .slice()
                          .sort()
                          .map((mealOffer: IMealOfferCard) => (
                            <Row key={`${mealOffer._id}-container`}>
                              <MealOffer
                                mealId={mealOffer._id}
                                price={mealOffer.price}
                                distance={mealOffer.distance}
                                mealTitle={mealOffer.title}
                                portions={mealOffer.portions}
                                sellerRating={mealOffer.rating}
                                endDate={mealOffer.endDate}
                                sellerName={"FirstName of Seller"}
                                startDate={mealOffer.endDate}
                              />
                            </Row>
                          ))}
                    </>
                  )}
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
