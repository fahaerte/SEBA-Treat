import React, { useEffect, useState } from "react";
import { Header } from "../../components/ui/Header/header";
import { Container } from "react-bootstrap";
import { Button, Card, Col, Row, SkeletonSquare } from "../../components";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getUserPreview } from "../../api/userApi";
import { getMealOffer } from "../../api/mealApi";
import { useParams } from "react-router-dom";

export const MealOfferDetailScreen = () => {
  const { mealOfferId } = useParams();
  const { userId, token } = useAuthContext();

  // const { data: user } = useQuery("getUser", () =>
  //   getUser(userId as string, token as string)
  // );

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string, undefined)
  );

  const { data: seller, isLoading: sellerIsLoading } = useQuery(
    ["getSeller", mealOffer],
    () => getUserPreview(mealOffer.data.user as string)
  );

  useEffect(() => {
    if (mealOffer) {
      console.log(mealOffer);
      console.log(mealOffer.data.user);
      console.log(mealOffer.data.allergens);
    }
  }, [mealOffer]);

  useEffect(() => {
    if (seller) {
      console.log("incoming");
      console.log(seller);
    }
  }, [seller]);

  return (
    <>
      <div>
        {mealOfferIsLoading || sellerIsLoading ? (
          <Container className={""}>
            <Row className={"pt-5"}>
              <PageHeading>
                Meal <u>is loading...</u>
              </PageHeading>
            </Row>
          </Container>
        ) : mealOffer && seller ? (
          <Container className={""}>
            <Row className={"pt-5"}>
              <PageHeading>
                <u>{mealOffer.data.title}</u>
              </PageHeading>
              <p>{seller.data.firstName}</p>
              <p>
                Star {seller.data.meanRating}/5 – {seller.data.countRatings}{" "}
                Ratings
              </p>
              <p>{mealOfferId}</p>
            </Row>
          </Container>
        ) : (
          <Container className={""}>
            <Row className={"pt-5"}>
              <PageHeading>
                Meal <u>not found</u>
              </PageHeading>
            </Row>
          </Container>
        )}
        )
      </div>
    </>
  );
};
