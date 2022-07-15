import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "../../components";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery, useQueryClient } from "react-query";
import { getMealOffersByParams } from "../../api/mealApi";
import { MealOfferScreenHeader } from "../../components/ui/Header/mealOfferScreenHeader";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import { IMealFilter, IMealOfferCard, IStringObject } from "@treat/lib-common";
import MealOffer from "../../components/MealOffers/MealOffer";
import MealOfferFilterTop from "../../components/MealOffers/MealOfferFilterTop";
import MealOfferFilterSide from "../../components/MealOffers/MealOfferFilterSide";

export const MealOfferScreen = () => {
  const { token, address, setAddress } = useAuthContext();

  const [filter, setFilter] = useState<IMealFilter>();
  const [portions, setPortions] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [maxprice, setMaxprice] = useState<number>();
  const [allergen, setAllergen] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [sellerrating, setSellerrating] = useState<number>();
  const [startdate, setStartdate] = useState<string>();
  const [enddate, setEnddate] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [sortingrule, setSortingrule] = useState<string>();

  const queryClient = useQueryClient();

  const queryKey = "getOffers";

  const { data: offers, isLoading } = useQuery(
    queryKey,
    () => getMealOffersByParams(
      address as string,
      token as string,
      portions,
      category,
      allergen,
      sellerrating,
      startdate,
      enddate,
      maxprice,
      search,
      distance)
  );

  useEffect(() => {
    queryClient.invalidateQueries(queryKey);
  }, [search, enddate, startdate, portions, maxprice, sellerrating]);

  const handleSearch = (searchStringObject: IStringObject) => {
    if (searchStringObject.returnedString === "") {
      setSearch(undefined);
    } else {
      setSearch(searchStringObject.returnedString);
    }
  };

  const handleSort = (sort: IStringObject) => {
    console.log(sort);
    setSortingrule(sort.returnedString);
  };

  const handleFiltering = (filter: IMealFilter) => {
    console.log(filter);
  };

  const sortRule = (meal1: IMealOfferCard, meal2: IMealOfferCard) => {
    switch (sortingrule) {
      case "rating":
        return meal2.rating - meal1.rating;
      case "price":
        return meal1.price - meal2.price;
      default:
        return meal1.distance - meal2.distance;
    }
  };

  return (
    <>
      <MealOfferScreenHeader />
      <Container className={""}>
        <Row>
          <Col className={"col col-lg-2"}>
            <Row>
              <MealOfferFilterSide
                currentFilter={filter as IMealFilter}
                handleFiltering={handleFiltering}
              />
            </Row>
          </Col>
          <Col>
            <Row>
              <MealOfferFilterTop
                handleSearch={handleSearch}
                handleSort={handleSort}
                currentSearchString={search}
                currentSortingRule={sortingrule} />
            </Row>
            <Row>{offers ? offers.data.length : "No"} Offers found</Row>
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
                                buttonAction={handleFiltering} />
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
