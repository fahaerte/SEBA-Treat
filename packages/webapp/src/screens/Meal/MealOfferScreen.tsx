import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "../../components";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery, useQueryClient } from "react-query";
import { getMealOffersByParams } from "../../api/mealApi";
import { MealOfferScreenHeader } from "../../components/ui/Header/mealOfferScreenHeader";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import { IMealOfferCard, IStringObject } from "@treat/lib-common";
import MealOffer from "../../components/MealOffers/MealOffer";
import MealOfferFilterTop from "../../components/MealOffers/MealOfferFilterTop";
import MealOfferFilterSide from "../../components/MealOffers/MealOfferFilterSide";

export const MealOfferScreen = () => {
  const { token, address, setAddress } = useAuthContext();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [sortingRule, setSortingRule] = useState<string>();
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [sellerRating, setSellerRating] = useState<number | undefined>(
    undefined
  );
  const [portions, setPortions] = useState<number | undefined>(undefined);
  const [allergen, setAllergen] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  const queryKey = "getOffers";

  const { data: offers, isLoading } = useQuery(queryKey, () =>
    getMealOffersByParams(
      address as string,
      token as string,
      portions,
      category,
      allergen,
      sellerRating,
      price,
      search,
      distance
    )
  );

  useEffect(() => {
    queryClient.fetchQuery(queryKey);
  }, [search, distance, price, allergen, category, sellerRating, portions]);

  const handleSearch = (event: any) => {
    console.log(event.target.value);
    if (event.target.value === '') {
      setSearch(undefined);
    } else {
      setSearch(event.target.value); //Problem: on every keyboard stroke a request is sent --> expensive
    }
  };

  const handleSort = (event: any) => {
    setSortingRule(event.target.value);
  };

  const handleChangedFilter = (event: any) => {
    switch (event.target.id) {
      case "max.-distance":
        setDistance(() => Number(event.target.value) === 0? undefined : Number(event.target.value));
        break;
      case "max.-price":
        setPrice(() => Number(event.target.value) === 0? undefined : Number(event.target.value));
        break;
      case "portions":
        setPortions(() => Number(event.target.value) === 0? undefined : Number(event.target.value));
        break;
      case "min.-seller-rating":
        setSellerRating(() => Number(event.target.value) === 0? undefined : Number(event.target.value));
        break;
      case "category":
        setCategory(() => event.target.value === 'None'? undefined : event.target.value);
        break;
      case "allergens":
        setAllergen(() => event.target.value === 'None'? undefined : event.target.value);
        break;
    }
  };

  const sortRule = (meal1: IMealOfferCard, meal2: IMealOfferCard) => {
    switch (sortingRule) {
      case "ratingDesc":
        return meal2.rating - meal1.rating;
      case "priceAsc":
        return meal1.price - meal2.price;
      default:
        return meal1.distance - meal2.distance;
    }
  };

  const resetFilters = () => {
    setPortions(undefined);
    setPrice(undefined);
    setDistance(undefined);
    setSearch(undefined);
    setAllergen(undefined);
    setCategory(undefined);
    setSellerRating(undefined);
  };

  return (
    <>
      <MealOfferScreenHeader />
      <Container className={""}>
        <Row>
          <Col className={"col col-lg-2"}>
            <Row>
              <MealOfferFilterSide
                distance={distance}
                handleChangedFilter={handleChangedFilter}
                allergen={allergen}
                category={category}
                maxPrice={price}
                portions={portions}
                sellerRating={sellerRating}
                buttonAction={resetFilters}
              />
            </Row>
          </Col>
          <Col>
            <Row>
              <MealOfferFilterTop
                handleSearch={handleSearch}
                handleSort={handleSort}
                currentSearchString={search}
                currentSortingRule={sortingRule ? sortingRule : "distanceAsc"}
              />
            </Row>
            <Row className={"m-2 row justify-content-center"}>
              {offers ? offers.data.length : "No"} Offers found
            </Row>
            <Row>
              <Col>
                <Container>
                  {isLoading ? (
                    <LoadingPackages />
                  ) : (
                    <>
                      {offers &&
                        offers.data
                          .slice()
                          .sort(sortRule)
                          .map((mealOffer: IMealOfferCard) => (
                            <Row key={`${mealOffer._id}-container`}>
                              <MealOffer
                                mealId={mealOffer._id}
                                price={mealOffer.price}
                                distance={mealOffer.distance}
                                mealTitle={mealOffer.title}
                                portions={mealOffer.portions}
                                sellerRating={mealOffer.rating}
                                endDate={mealOffer.endDate}
                                sellerName={"FirstName of Seller"}
                                startDate={mealOffer.endDate}
                              />
                            </Row>
                          ))}
                    </>
                  )}
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
