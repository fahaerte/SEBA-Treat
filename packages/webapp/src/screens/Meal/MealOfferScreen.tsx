import React, { useEffect, useState } from "react";
import { Header } from "../../components/ui/Header/header";
import { Container } from "react-bootstrap";
import { Button, Card, Col, Row, SkeletonSquare } from "../../components";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { getMealOffer } from "../../api/mealApi";

export const MealOfferScreen = () => {
  const { userId, token } = useAuthContext();

  const { data: user } = useQuery("getUser", () =>
    getUser(userId as string, token as string)
  );

  const { data: mealOffer } = useQuery("getMealOffer", () =>
    getMealOffer("62b4568672d5fc52e250133e", token as string)
  );

  useEffect(() => {
    if (mealOffer) {
      console.log(mealOffer);
      console.log(mealOffer.data.allergens);
    }
  }, [mealOffer]);

  return (
    <>
      <div>
        <Container className={""}>
          <Row className={"pt-5"}>
            <PageHeading>
              Meal Offer <u>Spagh Bollo</u>
            </PageHeading>
          </Row>
        </Container>
      </div>
    </>
  );
};
