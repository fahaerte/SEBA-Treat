import React from "react";
import { SCMealDetails } from "./styles";
import { Typography, Row, Icon } from "../index";

const MealDetails = ({
  distance,
  portions,
  startDate,
  endDate,
}: {
  distance: number;
  portions: number;
  startDate: Date;
  endDate: Date;
}) => {
  const startDateAsString = new Date(startDate).toLocaleDateString();
  const startTimeAsString = new Date(startDate).toLocaleTimeString();
  const endDateAsString = new Date(endDate).toLocaleDateString();
  const endTimeAsString = new Date(endDate).toLocaleTimeString();

  return (
    <SCMealDetails>
      <Row justify={"between"} className={"fw-normal mb-3"}>
        <Typography
          className={"fw-normal mb-3"}
          variant={"div"}
          display={"inline"}
        >
          <Icon type={"geo-alt"} size={"lg"} />
          {distance} Dreihunderttausend Kilometer
        </Typography>
        <Typography
          className={"fw-normal mb-3"}
          variant={"div"}
          display={"inline"}
        >
          <Icon type={"people-fill"} size={"lg"} />
          {portions} {portions === 1 ? "Portion" : "Portions"}
        </Typography>
        <Typography
          className={"fw-normal mb-3"}
          variant={"div"}
          display={"inline"}
        >
          <Icon type={"calendar"} size={"lg"} />
          {startDateAsString}, {startTimeAsString} – {endDateAsString},{" "}
          {endTimeAsString}
        </Typography>
      </Row>
    </SCMealDetails>
  );
};

export default MealDetails;
