import React from "react";
import { Container } from "react-bootstrap";
import {
  Col,
  dangerToast,
  MealDetails,
  PageHeading,
  Row,
  SectionHeading,
  successToast,
  Tag,
  UserPreview,
} from "../../components";
import { useMutation, useQuery } from "react-query";
import { getMealOffer, requestMealOffer } from "../../api/mealApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MealRequestCard from "../../components/MealRequestCard/MealRequestCard";
import { AxiosError } from "axios";

export const MealOfferDetailScreen = () => {
  const { mealOfferId } = useParams();
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
      navigate("/login", { state: { from: location } });
    },
  });

  function handleRequestClick() {
    void requestMealMutation.mutate({
      mealOfferId: mealOfferId as string,
    });
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
            <div
              className={"pt-5"}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PageHeading>
                <u>{mealOffer.title}</u>
              </PageHeading>
              {mealOffer.categories.map((category: string) => (
                <Tag key={category}>{category}</Tag>
              ))}
            </div>
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
                  backgroundColor: "grey",
                  color: "white",
                }}
              >
                Meal Pictures
              </div>
            </Row>
            <MealDetails
              distance={mealOffer.distance}
              portions={mealOffer.portions}
              startDate={mealOffer.startDate}
              endDate={mealOffer.endDate}
            />
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
