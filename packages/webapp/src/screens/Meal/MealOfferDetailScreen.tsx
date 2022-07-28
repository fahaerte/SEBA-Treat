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
  UserPreview,
} from "../../components";
import { useQuery } from "react-query";
import { getMealOffer } from "../../api/mealApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MealRequestCard from "../../components/MealRequestCard/MealRequestCard";
import { getCookie } from "../../utils/auth/CookieProvider";
import { ConfigService } from "../../utils/ConfigService";

export const MealOfferDetailScreen = () => {
  const userId = getCookie("userId");
  const address = getCookie("address");

  const { mealOfferId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [disabledText, setDisabledText] = useState("");

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string, address as string),
    {
      onSuccess: (response) => {
        const nowDate = new Date();
        const startDate = new Date(response.startDate as string);
        const endDate = new Date(response.endDate as string);

        if (startDate > nowDate)
          setDisabledText("The offer has not started yet.");
        if (endDate < nowDate) setDisabledText("The offer has expired.");
        if (userId === response.user._id) {
          setDisabledText("You cannot reserve your own meal.");
        } else if (userId && response.reservations.length)
          setDisabledText("You have already reserved this meal.");
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
              img={"undefined"}
              firstName={mealOffer.user.firstName}
              lastName={mealOffer.user.lastName}
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
                    alt={`Image for ${mealOffer.title}`}
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
                  mealOfferId={mealOffer._id}
                  userId={userId}
                  productName={mealOffer.title}
                  mealPrice={mealOffer.price}
                  transactionFee={mealOffer.transactionFee}
                  disabledText={disabledText}
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
