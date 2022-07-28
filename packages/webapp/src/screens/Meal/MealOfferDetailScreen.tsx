import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  Button,
  Badge,
  Col,
  dangerToast,
  MealDetails,
  PageHeading,
  Row,
  SectionHeading,
  successToast,
  UserPreview,
} from "../../components";
import { useMutation, useQuery } from "react-query";
import { getMealOffer, requestMealOffer } from "../../api/mealApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MealRequestCard from "../../components/MealRequestCard/MealRequestCard";
import { AxiosError } from "axios";
import { getCookie } from "../../utils/auth/CookieProvider";
import { ConfigService } from "../../utils/ConfigService";

export const MealOfferDetailScreen = () => {
  const userId = getCookie("userId");
  const address = getCookie("address");

  const { mealOfferId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [enableReservation, setEnableReservation] = useState(true);
  const [reservationText, setReservationText] = useState("Reserve meal");

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string, address),
    {
      onSuccess: (response) => {
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
        } else if (userId && response.reservations.length) {
          setReservationText("You have already reserved this meal.");
          setEnableReservation(false);
        }
      },
    }
  );

  function handleEditClick() {
    if (userId && userId === mealOffer.user._id) {
      navigate(`/mealOffers/${mealOfferId}/edit`, {
        state: { from: location },
      });
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
            <Row className={"pt-5 me-1"}>
              <Col className={"d-flex align-items-center"}>
                <PageHeading className={"text-nowrap"}>
                  <u>{mealOffer.title}</u>
                </PageHeading>
                {mealOffer.categories.map((category: string) => (
                  <Badge key={category} outlined>
                    {category}
                  </Badge>
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
              // img={"undefined"} // TODO: add image url
              firstName={mealOffer.user.firstName}
              // lastName={mealOffer.user.lastName}
              meanRating={mealOffer.user.meanRating}
              countRatings={mealOffer.user.countRatings}
            />
            <Row>
              {/* TODO: make component for image gallery */}
              <Col>
                <div
                  className={"d-inline-block"}
                  style={{
                    height: "400px",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className={"w-100 h-100"}
                    style={{
                      position: "absolute",
                      backgroundImage: `url(${new ConfigService().get(
                        "MEAL_IMAGES_URL"
                      )}/${mealOffer.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      opacity: "0.3",
                    }}
                  />
                  <img
                    src={`${new ConfigService().get("MEAL_IMAGES_URL")}/${
                      mealOffer.image
                    }`}
                    className={"h-100 d-block"}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </Col>
            </Row>
            <MealDetails
              distance={mealOffer.distance}
              portions={mealOffer.portions}
              startDate={mealOffer.startDate}
              endDate={mealOffer.endDate}
            />
            <Row>
              <Col className={"pe-5"}>
                <SectionHeading>Description</SectionHeading>
                <p>{mealOffer.description}</p>
                <SectionHeading>Location</SectionHeading>
                <p>
                  {mealOffer.user.firstName} is {mealOffer.distance} kilometers
                  away from you. You will see the exact location once the seller
                  accepted your reservation.
                </p>
                <SectionHeading>List of Allergens</SectionHeading>
                {mealOffer.allergens.map((allergen: string) => (
                  <Badge key={allergen} outlined>
                    {allergen}
                  </Badge>
                ))}
              </Col>
              {/* TODO: maxWidth: 400px*/}
              <Col>
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
          <Container>
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
