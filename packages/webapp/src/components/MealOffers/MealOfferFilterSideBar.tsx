import {
  Button,
  Col,
  Row,
  SelectControlled,
  TagSelectControlled,
  TOptionValuePair,
} from "../ui";
import React from "react";
import {
  createAllergensOptions,
  createCategoriesOptions,
} from "../../utils/createMealValueArrays";

const MealOfferFilterSideBar = ({
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
    <Col>
      <Row className={"m-2"}>
        <SelectControlled
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
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <SelectControlled
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
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <SelectControlled
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
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <SelectControlled
          label={"Min. Seller Rating"}
          value={String(sellerRating)}
          onChange={handleChangedFilter}
        >
          <option value={0}>Choose</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <SelectControlled
          value={category as string}
          label={"Category"}
          onChange={handleChangedFilter}
        >
          <option value={"None"}>None</option>
          <>
            {createCategoriesOptions().map((category) => (
              <option value={category.value} key={category.label}>
                {category.label}
              </option>
            ))}
          </>
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <TagSelectControlled
          autocompleteOptions={[
            { value: "None", label: "none" },
            ...createAllergensOptions(),
          ]}
          label={"Allergens"}
          value={allergen || []}
          onChange={handleChangedFilter}
        />
      </Row>
      <Row className={"m-2"}>
        <Button onClick={buttonAction} color={"secondary"}>
          Reset Filters
        </Button>
      </Row>
    </Col>
  );
};

export default MealOfferFilterSideBar;
