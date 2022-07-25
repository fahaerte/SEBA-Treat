import React from "react";
import {
  Card,
  Typography,
  Button,
  Col,
  Row,
  CardImage,
  CardBody,
  Icon,
  CardFooter,
  CardTitle,
  CardText,
  CardExpander,
  Badge,
} from "../ui";
import { useNavigate } from "react-router-dom";
import PlaceholderImg from "../../assets/nudeln.jpg";

const MealOffer = ({
  mealId,
  mealTitle,
  price,
  sellerRating,
  distance,
  portions,
  sellerName,
  startDate,
  endDate,
  allergensVerified,
  categories,
}: {
  mealId: string;
  mealTitle: string;
  price: number;
  sellerRating: number;
  distance: number;
  portions: number;
  sellerName: string;
  startDate: Date;
  endDate: Date;
  allergensVerified: boolean;
  categories: string[];
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/mealoffers/${mealId}`);
    return mealId;
  };

  const startDateAsString = new Date(startDate).toLocaleDateString();
  const endDateAsString = new Date(endDate).toLocaleDateString();

  return (
    <Card hoverable>
      <CardImage src={PlaceholderImg} />

      <CardBody>
        <Row>
          <CardTitle>{mealTitle}</CardTitle>
          {allergensVerified && (
            <Typography color={"info"}>
              <Icon type={"check-circle-fill"} />
            </Typography>
          )}
        </Row>
        <Row>
          <Col>
            <Typography
              variant={"h4"}
              component={"div"}
              className={"fw-normal"}
            >
              <Icon type={"person"} /> {sellerName}
            </Typography>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <CardText>
              {sellerRating} <Icon type={"star-fill"} />
            </CardText>
          </Col>
        </Row>
        <CardExpander>
          <Row>
            <Col>
              <Typography variant={"psmall"} className={"fw-normal"}>
                <Icon type={"calendar"} /> {startDateAsString} –{" "}
                {endDateAsString}
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant={"psmall"} className={"fw-normal"}>
                <Icon type={"geo-alt"} /> {distance} km
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant={"psmall"} className={"fw-normal"}>
                <Icon type={"people-fill"} /> {portions} Portions
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant={"psmall"} className={"fw-normal"}>
                <Icon type={"coin"} /> {price} Cr
              </Typography>
            </Col>
          </Row>
          {categories && (
            <Row className={"d-inline"}>
              {categories.map((category) => (
                <Typography variant={"p"} key={category} display={"inline"}>
                  <Badge outlined>{category}</Badge>
                </Typography>
              ))}
            </Row>
          )}
        </CardExpander>
      </CardBody>
      <CardFooter>
        <Button onClick={handleSelect} size={"sm"}>
          <Icon type={"cart"} /> Select Offer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealOffer;
