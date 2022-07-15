import { Col, Form, FormHelper, IFormRow, Row, SelectControlled } from "../ui";
import React from "react";
import { text } from "stream/consumers";
import { IStringObject } from "@treat/lib-common";
import Select from "../ui/Forms/Select/Select";

const MealOfferFilterTop = (
  {
    handleSearch,
    handleSort,
    currentSearchString,
    currentSortingRule
  }: {
    handleSearch: (search: IStringObject) => void;
    handleSort: (sort: IStringObject) => void;
    currentSearchString: string | undefined;
    currentSortingRule: string | undefined;
  }) => {

  const searchElement: IFormRow<IStringObject>[] = [
    [
      FormHelper.createInput({
        formKey: "returnedString",
        label: "Search by name",
        props: {
          type: "text"
        },
        defaultValue: currentSearchString
      })
    ]
  ];

  const sortElement: IFormRow<IStringObject>[] = [
    [
      FormHelper.createSelect({
        formKey: "returnedString",
        label: "Sort by:",
        options: [
          new Option("distance", "distance"),
          new Option("price", "price"),
          new Option("rating", "rating")
        ],
        defaultValue: new Option("", currentSortingRule)
      })
    ]
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
          label={"Sort by"} value={"hi"} >

        </SelectControlled>
      </Col>
    </Row>
  );
};

export default MealOfferFilterTop;
