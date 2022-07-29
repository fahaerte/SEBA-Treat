import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  Badge,
  Button,
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
        console.log(response);
        const nowDate = new Date();
        const endDate = new Date(response.endDate as string);

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
      navigate(`/meals/${mealOfferId}/edit`, {
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
          <Container>
            <Row>
              <PageHeading>
                Meal <u>is loading...</u>
              </PageHeading>
            </Row>
          </Container>
        ) : mealOffer ? (
          <Container>
            <Row>
              <Col className={"d-flex align-items-center"}>
                <PageHeading className={"text-nowrap me-3"}>
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
              // img={"undefined"}
              firstName={mealOffer.user.firstName}
              // lastName={mealOffer.user.lastName}
              meanRating={mealOffer.user.meanRating}
              countRatings={mealOffer.user.countRatings}
              offeredBy={true}
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
                <SectionHeading>
                  {mealOffer.pickUpDetails ? "Pickup Details" : "Location"}
                </SectionHeading>
                {mealOffer.pickUpDetails ? (
                  <p>{mealOffer.pickUpDetails}</p>
                ) : (
                  <p>
                    {mealOffer.user.firstName} is {mealOffer.distance}{" "}
                    kilometers away from you. You will get the exact location
                    via email after the seller accepted your reservation.
                  </p>
                )}
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
