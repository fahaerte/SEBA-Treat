import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Col,
  dangerToast,
  infoToast,
  Row,
  SectionHeading,
  successToast,
} from "../../components";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useMutation, useQuery } from "react-query";
import { getUserPreview } from "../../api/userApi";
import { getMealOffer, requestMealOffer } from "../../api/mealApi";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import MealRequestCard from "../../components/MealRequestCard/MealRequestCard";
import { AxiosError } from "axios";
import UserPreview from "../../components/Profile/UserPreview";

export const MealOfferDetailScreen = () => {
  const { mealOfferId } = useParams();
  const { token } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string),
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );

  const requestMealMutation = useMutation(requestMealOffer, {
    onSuccess: () => {
      successToast({
        message:
          "The meal has been reserved for you. Now, the chef can accept it.",
      });
    },
    onError: (error) => {
      console.log("onError:");
      if (error instanceof AxiosError && error.response) {
        dangerToast({
          message: error.response.data.message,
        });
      } else {
        dangerToast({
          message: "Unexpected server error. The meal could not be reserved.",
        });
      }
    },
  });

  function handleRequestClick() {
    if (token) {
      const result = requestMealMutation.mutate({
        mealOfferId: mealOfferId as string,
        token: token,
      });
    } else {
      infoToast({
        message: `Please log in to reserve this meal`,
      });
      navigate("/login", { state: { from: location } });
    }
  }

  return (
    <>
      <div>
        {mealOfferIsLoading ? (
          <Container className={""}>
            <Row className={"pt-5"}>
              <PageHeading>
                Meal <u>is loading...</u>
              </PageHeading>
            </Row>
          </Container>
        ) : mealOffer ? (
          <Container className={""}>
            <Row className={"pt-5"}>
              <PageHeading>
                <u>{mealOffer.title}</u>
              </PageHeading>
              {mealOffer.categories.map((category: string) => (
                <span key={category}>{category}</span>
              ))}
            </Row>
            <UserPreview
              img={"undefined"}
              firstName={mealOffer.user.firstName}
              lastName={mealOffer.user.lastName}
              meanRating={mealOffer.user.meanRating}
              countRatings={mealOffer.user.countRatings}
            />
            <Row>
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  border: "1px solid grey",
                  borderRadius: "1em",
                }}
              >
                Meal Pictures
              </div>
            </Row>
            <Row>
              <span>Distance: unknown</span>
              <span>Portions: {mealOffer.portions}</span>
              <span>
                {mealOffer.startDate} – {mealOffer.endDate}
              </span>
            </Row>
            <Row>
              <Col>
                <SectionHeading>Description</SectionHeading>
                <p>{mealOffer.description}</p>
                <SectionHeading>Location</SectionHeading>
                <p>{mealOffer.transactionFee}</p>
                <SectionHeading>List of Allergens</SectionHeading>
                <ul>
                  {mealOffer.allergens.map((allergen: string) => (
                    <li key={allergen}>{allergen}</li>
                  ))}
                </ul>
              </Col>
              <Col>
                <MealRequestCard
                  key={mealOffer._id}
                  productName={mealOffer.title}
                  mealPrice={mealOffer.price}
                  transactionFee={mealOffer.transactionFee}
                  buttonAction={() => handleRequestClick()}
                />
              </Col>
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
      </div>
    </>
  );
};
