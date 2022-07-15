import { Col, Form, FormHelper, IFormRow, Row } from "../ui";
import { IMealFilter, IUserCredentials } from "@treat/lib-common";
import React from "react";
import { text } from "stream/consumers";

const searchElement: IFormRow<string>[] = [
  [
    FormHelper.createInput({
      formKey: "searchString",
      label: "Search by name",
      props: {
        type: "text",
      },
    }),
  ],
];

const sortElement: IFormRow<string>[] = [
  [
    FormHelper.createSelect({
      formKey: "sortingOptions",
      label: "Sort by:",
      options: [
        new Option("price ascending", "priceAsc"),
        new Option("rating descending", "ratingDesc"),
        new Option("distance descending", "distDesc"),
      ],
    }),
  ],
];

const MealOfferFilterTop = ({
  handleSearch,
  handleSort,
}: {
  handleSearch: (search: string) => void;
  handleSort: (sort: string) => void;
}) => {
  return (
    <Row>
      <Col>
        <Form<string>
          elements={searchElement}
          submitButton={null}
          onSubmit={handleSearch}
        />
      </Col>
      <Col>
        <Form<string>
          elements={sortElement}
          submitButton={null}
          onChange={handleSort}
        />
      </Col>
    </Row>
  );
};

export default MealOfferFilterTop;
