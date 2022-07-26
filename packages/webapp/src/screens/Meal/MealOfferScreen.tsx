import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  TOptionValuePair,
  Typography,
} from "../../components";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getMealOffersByParams } from "../../api/mealApi";
import { IMealOfferCard } from "@treat/lib-common";
import MealOffer from "../../components/MealOffers/MealOffer";
import MealOfferFilterTopBar from "../../components/MealOffers/MealOfferFilterTopBar";
import MealOfferFilterSideBar from "../../components/MealOffers/MealOfferFilterSideBar";
import { ESortingRules } from "@treat/lib-common/lib/enums/ESortingRules";

export const MealOfferScreen = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [sortingRule, setSortingRule] = useState<ESortingRules>(
    ESortingRules.DIST_ASC
  );
  const [distance, setDistance] = useState<number>(5);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [sellerRating, setSellerRating] = useState<number | undefined>(
    undefined
  );
  const [portions, setPortions] = useState<number | undefined>(undefined);
  const [allergen, setAllergen] = useState<TOptionValuePair[] | undefined>(
    undefined
  );
  const [category, setCategory] = useState<TOptionValuePair[] | undefined>(
    undefined
  );

  const queryClient = useQueryClient();

  const queryKey = "getOffers";

  const pageLimit = 10;

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = 1 }) =>
        getMealOffersByParams(
          pageParam,
          pageLimit,
          distance,
          portions,
          category,
          allergen,
          sellerRating,
          price,
          search,
          sortingRule
        ),
      {
        getNextPageParam: (lastPage, allPages) => {
          const maxPages = Math.ceil(lastPage.total_count / pageLimit);
          const nextPage = allPages.length + 1;
          return nextPage <= maxPages ? nextPage : undefined;
        },
      }
    );

  useEffect(() => {
    queryClient.fetchQuery(queryKey);
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [
    search,
    distance,
    price,
    allergen,
    category,
    sellerRating,
    portions,
    queryClient,
  ]);

  const handleSearch = (event: any) => {
    if (event.target.value === "") {
      setSearch(undefined);
    } else {
      setSearch(event.target.value);
    }
  };

  const handleSort = (event: any) => {
    setSortingRule(event.target.value);
  };

  const handleChangedFilter = (event: any, element?: string) => {
    console.log(event);
    switch (event.target.id) {
      case "max.-distance":
        setDistance(() =>
          Number(event.target.value) === 0 ? 5 : Number(event.target.value)
        );
        break;
      case "max.-price":
        setPrice(() =>
          Number(event.target.value) === 0
            ? undefined
            : Number(event.target.value)
        );
        break;
      case "portions":
        setPortions(() =>
          Number(event.target.value) === 0
            ? undefined
            : Number(event.target.value)
        );
        break;
      case "min.-seller-rating":
        setSellerRating(() =>
          Number(event.target.value) === 0
            ? undefined
            : Number(event.target.value)
        );
    }
  };

  const resetFilters = () => {
    setPortions(undefined);
    setPrice(undefined);
    setDistance(5);
    setSearch(undefined);
    setAllergen(undefined);
    setCategory(undefined);
    setSellerRating(undefined);
  };

  return (
    <>
      <Container>
        <Row>
          <Typography variant={"h1"} className={"fw-normal"}>
            What do you want to eat today?
          </Typography>

          <Col className={"col col-lg-2"}>
            <Row>
              <MealOfferFilterSideBar
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
              <MealOfferFilterTopBar
                handleSearch={handleSearch}
                handleSort={handleSort}
                currentSearchString={search}
                currentSortingRule={sortingRule}
              />
            </Row>
            <Row className={"m-2 row justify-content-center"}>
              {isFetching || isFetchingNextPage ? "Loading data..." : ""}
            </Row>
            <Row className={"m-2 row justify-content-center"}>
              {data ? data.pages[0].total_count : "No "} Offers found
            </Row>
            <Row className={"row-cols-2 row-cols-md-3 g-4"}>
              {data &&
                data.pages.map((page) => {
                  return page.data.map((mealOffer: IMealOfferCard) => (
                    <Col key={`${mealOffer._id}-container`}>
                      <MealOffer
                        key={mealOffer._id}
                        mealId={mealOffer._id}
                        price={mealOffer.price}
                        distance={mealOffer.distance}
                        mealTitle={mealOffer.title}
                        portions={mealOffer.portions}
                        sellerRating={mealOffer.user.meanRating}
                        endDate={mealOffer.endDate}
                        sellerName={mealOffer.user.firstName}
                        startDate={mealOffer.endDate}
                        allergensVerified={mealOffer.allergensVerified}
                        categories={mealOffer.categories}
                      />
                    </Col>
                  ));
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
