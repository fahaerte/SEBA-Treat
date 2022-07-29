import React from "react";
import {
  Card,
  Typography,
  Col,
  Row,
  CardImage,
  CardBody,
  Icon,
  CardTitle,
  CardText,
  Badge,
} from "../ui";
import { useNavigate } from "react-router-dom";

const MealOffer = ({
  mealId,
  mealTitle,
  price,
  sellerRating,
  distance,
  portions,
  sellerName = "",
  startDate,
  endDate,
  allergensVerified,
  categories,
  image,
}: {
  mealId: string;
  mealTitle: string;
  price: number;
  sellerRating: number;
  distance: number;
  portions: number;
  sellerName?: string;
  startDate: Date;
  endDate: Date;
  allergensVerified: boolean;
  categories: string[];
  image: string;
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/meals/${mealId}`);
    return mealId;
  };
  const startDateAsString = new Date(startDate).toLocaleDateString();
  const endDateAsString = new Date(endDate).toLocaleDateString();

  return (
    <Card hoverable onClick={handleSelect} className={"h-100"}>
      <CardImage src={image} className={"h-100"} />

      <CardBody>
        <Row>
          <Col>
            <CardTitle>{mealTitle}</CardTitle>
          </Col>
          {allergensVerified && (
            <Col md={{ span: 3 }} className={"d-flex justify-content-end"}>
              <Typography color={"info"} display={"inline"}>
                <Icon type={"check-circle-fill"} />
              </Typography>
            </Col>
          )}
        </Row>
        {sellerName.length > 0 && (
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
            <Col md={{ span: 3 }} className={"d-flex justify-content-end"}>
              <CardText>
                {sellerRating} <Icon type={"star-fill"} />
              </CardText>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Typography variant={"psmall"} className={"fw-normal"}>
              <Icon type={"calendar"} /> {startDateAsString} – {endDateAsString}
            </Typography>
          </Col>
        </Row>
        {distance && (
          <Row>
            <Col>
              <Typography variant={"psmall"} className={"fw-normal"}>
                <Icon type={"geo-alt"} /> {distance} km
              </Typography>
            </Col>
          </Row>
        )}
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
      </CardBody>
    </Card>
  );
};

export default MealOffer;
