import {
  Button,
  Col,
  Icon,
  Row,
  TagSelectControlled,
  TOptionValuePair,
} from "../ui";
import React from "react";
import {
  createAllergensOptions,
  createCategoriesOptions,
} from "../../utils/createMealValueArrays";
import SelectControlledRound from "../ui/Forms/Select/SelectControlledRound";
import styled from "styled-components";

const SCFilterBar = styled.div`
  .filter-row {
    display: flex;
    flex-direction: row;

    > div {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      max-width: 160px;
      min-width: 140px;
    }

    > div.allergen-select {
      max-width: 240px;
    }

    > div:last-child {
      margin-left: auto;
      min-width: min-content;
      width: min-content;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const MealOfferFilterBar = ({
  handleChangedFilter,
  distance,
  maxPrice,
  portions,
  sellerRating,
  category,
  allergen,
  buttonAction,
}: {
  handleChangedFilter: (event: any) => void;
  distance?: number;
  maxPrice?: number;
  portions?: number;
  sellerRating?: number;
  category?: string;
  allergen?: TOptionValuePair[];
  buttonAction: () => void;
}) => {
  return (
    <>
      <SCFilterBar>
        <Row className={"filter-row"}>
          <Col>
            <SelectControlledRound
              label={"Max. distance"}
              value={String(distance)}
              onChange={handleChangedFilter}
            >
              <option value={0}>Choose</option>
              <option value={1}>1 km</option>
              <option value={2}>2 km</option>
              <option value={3}>3 km</option>
              <option value={4}>4 km</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
            </SelectControlledRound>
          </Col>
          <Col>
            <SelectControlledRound
              label={"Max. price"}
              value={String(maxPrice)}
              onChange={handleChangedFilter}
            >
              <option value={0}>Choose</option>
              <option value={100}>100 Credits</option>
              <option value={200}>200 Credits</option>
              <option value={300}>300 Credits</option>
              <option value={400}>400 Credits</option>
              <option value={500}>500 Credits</option>
            </SelectControlledRound>
          </Col>
          <Col>
            <SelectControlledRound
              label={"Portions"}
              value={String(portions)}
              onChange={handleChangedFilter}
            >
              <option value={0}>Choose</option>
              <option value={1}>1 Portions</option>
              <option value={2}>2 Portions</option>
              <option value={3}>3 Portions</option>
              <option value={4}>4 Portions</option>
              <option value={5}>5 Portions</option>
            </SelectControlledRound>
          </Col>
          <Col>
            <SelectControlledRound
              label={"Min. seller rating"}
              value={String(sellerRating)}
              onChange={handleChangedFilter}
            >
              <option value={0}>Choose</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </SelectControlledRound>
          </Col>
          <Col>
            <SelectControlledRound
              value={category as string}
              label={"Category"}
              onChange={handleChangedFilter}
            >
              <option value={"None"}>None</option>
              <>
                {createCategoriesOptions().map((category) => (
                  <option value={category.value} key={category.label}>
                    {category.label.charAt(0).toUpperCase() +
                      category.label.slice(1)}
                  </option>
                ))}
              </>
            </SelectControlledRound>
          </Col>
          <Col className={"allergen-select"}>
            <TagSelectControlled
              autocompleteOptions={[
                { value: "None", label: "none" },
                ...createAllergensOptions(),
              ]}
              label={"Allergens"}
              value={allergen || []}
              onChange={handleChangedFilter}
            />
            {/*<SelectControlledRound*/}
            {/*  value={allergen as string}*/}
            {/*  label={"Allergens"}*/}
            {/*  onChange={handleChangedFilter}*/}
            {/*>*/}
            {/*  <option value={"None"}>None</option>*/}
            {/*  <>*/}
            {/*    {createAllergensOptions().map((allergen) => (*/}
            {/*      <option value={allergen.value} key={allergen.label}>*/}
            {/*        {allergen.label.charAt(0).toUpperCase() +*/}
            {/*          allergen.label.slice(1)}*/}
            {/*      </option>*/}
            {/*    ))}*/}
            {/*  </>*/}
            {/*</SelectControlledRound>*/}
          </Col>
          <div>
            <Button
              onClick={buttonAction}
              color={"primary"}
              className={"align-middle"}
            >
              <Icon type={"x-lg"} />
            </Button>
          </div>
        </Row>
      </SCFilterBar>
    </>
  );
};

export default MealOfferFilterBar;
