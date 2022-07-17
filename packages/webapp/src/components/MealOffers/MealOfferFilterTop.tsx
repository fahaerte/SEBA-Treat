import { Col, Form, FormHelper, IFormRow, Row, SelectControlled } from "../ui";
import React from "react";
import { text } from "stream/consumers";
import { IStringObject } from "@treat/lib-common";
import Select from "../ui/Forms/Select/Select";

const MealOfferFilterTop = ({
  handleSearch,
  handleSort,
  currentSearchString,
  currentSortingRule,
}: {
  handleSearch: (search: IStringObject) => void;
  handleSort: (event: any) => void;
  currentSearchString: string | undefined;
  currentSortingRule: string;
}) => {
  const searchElement: IFormRow<IStringObject>[] = [
    [
      FormHelper.createInput({
        formKey: "returnedString",
        label: "Search by name",
        props: {
          type: "text",
        },
        defaultValue: currentSearchString,
      }),
    ],
  ];

  return (
    <Row>
      <Col>
        <Form<IStringObject>
          elements={searchElement}
          onSubmit={handleSearch}
          submitButton={null}
        />
      </Col>
      <Col>
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
