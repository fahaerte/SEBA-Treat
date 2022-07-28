import { Col, InputControlled, Row, SelectControlled } from "../ui";
import React from "react";
import { ESortingRules } from "@treat/lib-common/lib/enums/ESortingRules";

const MealOfferFilterTop = ({
  handleSearch,
  handleSort,
  currentSearchString,
  currentSortingRule,
}: {
  handleSearch: (event: any) => void;
  handleSort: (event: any) => void;
  currentSearchString: string | undefined;
  currentSortingRule: ESortingRules;
}) => {
  return (
    <Row className={"m-2"}>
      <Col className={"m-2"}>
        <InputControlled
          type={"search"}
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
          <option value={ESortingRules.PRICE_ASC}>
            {ESortingRules.PRICE_ASC.valueOf()}
          </option>
          <option value={ESortingRules.DIST_ASC}>
            {ESortingRules.DIST_ASC.valueOf()}
          </option>
          <option value={ESortingRules.RATING_DESC}>
            {ESortingRules.RATING_DESC.valueOf()}
          </option>
        </SelectControlled>
      </Col>
    </Row>
  );
};

export default MealOfferFilterTop;
