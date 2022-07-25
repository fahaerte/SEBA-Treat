import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Button,
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
import { getCookie } from "../../utils/auth/CookieProvider";

export const MealOfferDetailScreen = () => {
  const userId = getCookie("userId");

  const { mealOfferId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [enableReservation, setEnableReservation] = useState(true);
  const [reservationText, setReservationText] = useState("Reserve meal");

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string),
    {
      onSuccess: (response) => {
        console.log(response);

        const nowDate = new Date();
        const startDate = new Date(response.startDate);
        const endDate = new Date(response.endDate);

        if (startDate > nowDate) {
          setReservationText("The offer has not started yet.");
          setEnableReservation(false);
        }
        if (endDate < nowDate) {
          setReservationText("The offer has expired.");
          setEnableReservation(false);
        }
        if (userId === response.user._id) {
          setReservationText("You cannot reserve your own meal.");
          setEnableReservation(false);
        }
      },
    }
  );

  // useEffect(() => {
  //   console.log(mealOffer);
  //   const nowDate = new Date();
  //   const endDate = new Date(mealOffer.endDate);
  //   console.log("nowDate: ", nowDate);
  //   console.log("still valid: ", endDate > nowDate);
  //   if (userId !== mealOffer.user._id) {
  //     setEnableReservation(true);
  //   }
  // }, [mealOffer]);

  function handleEditClick() {
    if (userId && userId === mealOffer.user._id) {
      console.log("Edit click");
    } else {
      dangerToast({
        message: "You can only edit your own meals.",
      });
    }
  }

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
      if (!userId) {
        navigate("/login", { state: { from: location } });
      }
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
            <Row className={"pt-5 mr-1"}>
              <Col className={"d-flex align-items-center"}>
                <PageHeading className={"text-nowrap"}>
                  <u>{mealOffer.title}</u>
                </PageHeading>
                {mealOffer.categories.map((category: string) => (
                  <Tag key={category}>{category}</Tag>
                ))}
              </Col>
              <Col className={"d-flex align-items-center justify-content-end"}>
                {userId && userId === mealOffer.user._id && (
                  <Button className="px-3" onClick={handleEditClick}>
                    Edit
                  </Button>
                )}
              </Col>
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
              <Col style={{ paddingRight: "3em" }}>
                <SectionHeading>Description</SectionHeading>
                <p>{mealOffer.description}</p>
                <SectionHeading>Location</SectionHeading>
                <p>
                  {mealOffer.transactionFee} km (You will see the exact location
                  once the seller accepted your reservation.)
                </p>
                <SectionHeading>List of Allergens</SectionHeading>
                {mealOffer.allergens.map((allergen: string) => (
                  <Tag key={allergen}>{allergen}</Tag>
                ))}
              </Col>
              <Col style={{ maxWidth: "400px" }}>
                <MealRequestCard
                  productName={mealOffer.title}
                  mealPrice={mealOffer.price}
                  transactionFee={mealOffer.transactionFee}
                  disableButton={!enableReservation}
                  disabledText={reservationText}
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
