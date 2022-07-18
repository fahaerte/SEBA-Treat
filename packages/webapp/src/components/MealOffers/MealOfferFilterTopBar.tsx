import {
  Col,
  // Form,
  // FormHelper,
  // IFormRow,
  InputControlled,
  Row,
  SelectControlled,
} from "../ui";
import React from "react";

const MealOfferFilterTop = ({
  handleSearch,
  handleSort,
  currentSearchString,
  currentSortingRule,
}: {
  handleSearch: (event: any) => void;
  handleSort: (event: any) => void;
  currentSearchString: string | undefined;
  currentSortingRule: string;
}) => {
  return (
    <Row className={"m-2"}>
      <Col className={"m-2"}>
        <InputControlled
          value={currentSearchString as string}
          label={"search"}
          onChange={handleSearch}
        />
      </Col>
      <Col className={"m-2"}>
        <SelectControlled
          label={"Sort by"}
          value={currentSortingRule}
          onChange={handleSort}
        >
          <option value={"priceAsc"}>Price ascending</option>
          <option value={"distanceAsc"}>Distance ascending</option>
          <option value={"ratingDesc"}>Rating descending</option>
        </SelectControlled>
      </Col>
    </Row>
  );
};

export default MealOfferFilterTop;
