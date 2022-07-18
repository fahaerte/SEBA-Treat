import { Button, Col, Row, SelectControlled } from "../ui";
import React from "react";
import { EMealAllergen, EMealCategory } from "@treat/lib-common";

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
  distance: number | undefined;
  maxPrice: number | undefined;
  portions: number | undefined;
  sellerRating: number | undefined;
  category: string | undefined;
  allergen: string | undefined;
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
          label={"Category"}
          value={category as string}
          onChange={handleChangedFilter}
        >
          <option value={"None"}>None</option>
          <option value={EMealCategory.VEGAN}>{EMealCategory.VEGAN}</option>
          <option value={EMealCategory.VEGETARIAN}>
            {EMealCategory.VEGETARIAN}
          </option>
          <option value={EMealCategory.RAW}>{EMealCategory.RAW}</option>
          <option value={EMealCategory.ASIAN}>{EMealCategory.ASIAN}</option>
          <option value={EMealCategory.BEEF}>{EMealCategory.BEEF}</option>
          <option value={EMealCategory.BAKEDGOODS}>
            {EMealCategory.BAKEDGOODS}
          </option>
          <option value={EMealCategory.CHINESE}>{EMealCategory.CHINESE}</option>
          <option value={EMealCategory.DESSERT}>{EMealCategory.DESSERT}</option>
          <option value={EMealCategory.GERMAN}>{EMealCategory.GERMAN}</option>
          <option value={EMealCategory.HALAL}>{EMealCategory.HALAL}</option>
          <option value={EMealCategory.ITALIAN}>{EMealCategory.ITALIAN}</option>
          <option value={EMealCategory.KOREAN}>{EMealCategory.KOREAN}</option>
          <option value={EMealCategory.SWEETS}>{EMealCategory.SWEETS}</option>
          <option value={EMealCategory.PASTA}>{EMealCategory.PASTA}</option>
          <option value={EMealCategory.PORK}>{EMealCategory.PORK}</option>
          <option value={EMealCategory.SUSHI}>{EMealCategory.SUSHI}</option>
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <SelectControlled
          label={"Allergens"}
          value={allergen as string}
          onChange={handleChangedFilter}
        >
          <option value={"None"}>None</option>
          <option value={EMealAllergen.GLUTEN}>{EMealAllergen.GLUTEN}</option>
          <option value={EMealAllergen.OAT}>{EMealAllergen.OAT}</option>
          <option value={EMealAllergen.WHEAT}>{EMealAllergen.WHEAT}</option>
          <option value={EMealAllergen.EGG}>{EMealAllergen.EGG}</option>
          <option value={EMealAllergen.RYE}>{EMealAllergen.RYE}</option>
          <option value={EMealAllergen.ALMONDS}>{EMealAllergen.ALMONDS}</option>
          <option value={EMealAllergen.BARLEY}>{EMealAllergen.BARLEY}</option>
          <option value={EMealAllergen.CASHEWS}>{EMealAllergen.CASHEWS}</option>
          <option value={EMealAllergen.CELERY}>{EMealAllergen.CELERY}</option>
          <option value={EMealAllergen.CEREAL}>{EMealAllergen.CEREAL}</option>
          <option value={EMealAllergen.GARLIC}>{EMealAllergen.GARLIC}</option>
          <option value={EMealAllergen.HAZELNUTS}>
            {EMealAllergen.HAZELNUTS}
          </option>
          <option value={EMealAllergen.LACTOSE}>{EMealAllergen.LACTOSE}</option>
          <option value={EMealAllergen.LUPIN}>{EMealAllergen.LUPIN}</option>
          <option value={EMealAllergen.MACADEMIAS}>
            {EMealAllergen.MACADEMIAS}
          </option>
          <option value={EMealAllergen.MILK}>{EMealAllergen.MILK}</option>
          <option value={EMealAllergen.MOLLUSCS}>
            {EMealAllergen.MOLLUSCS}
          </option>
          <option value={EMealAllergen.MUSTARD}>{EMealAllergen.MUSTARD}</option>
          <option value={EMealAllergen.PEANUT}>{EMealAllergen.PEANUT}</option>
          <option value={EMealAllergen.PECANS}>{EMealAllergen.PECANS}</option>
          <option value={EMealAllergen.PISTACHIOS}>
            {EMealAllergen.PISTACHIOS}
          </option>
          <option value={EMealAllergen.WALNUTS}>{EMealAllergen.WALNUTS}</option>
          <option value={EMealAllergen.SESAME}>{EMealAllergen.SESAME}</option>
          <option value={EMealAllergen.SHELLFISH}>
            {EMealAllergen.SHELLFISH}
          </option>
          <option value={EMealAllergen.SHELLFRUITS}>
            {EMealAllergen.SHELLFRUITS}
          </option>
          <option value={EMealAllergen.SOY}>{EMealAllergen.SOY}</option>
          <option value={EMealAllergen.SPELT}>{EMealAllergen.SPELT}</option>
          <option value={EMealAllergen.SULFITES}>
            {EMealAllergen.SULFITES}
          </option>
          <option value={EMealAllergen.SULPHURS}>
            {EMealAllergen.SULPHURS}
          </option>
        </SelectControlled>
      </Row>
      <Row className={"m-2"}>
        <Button onClick={buttonAction}>Reset Filters</Button>
      </Row>
    </Col>
  );
};

export default MealOfferFilterSideBar;
