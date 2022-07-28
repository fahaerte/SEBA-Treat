import React, { useEffect, useState } from "react";
import { Col, Container, Row, TOptionValuePair } from "../../components";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getMealOffersByParams } from "../../api/mealApi";
import { IMealOfferCard } from "@treat/lib-common";
import MealOffer from "../../components/MealOffers/MealOffer";
import { ESortingRules } from "@treat/lib-common";
import { ConfigService } from "../../utils/ConfigService";
import MealOfferFilterBar from "../../components/MealOffers/MealOfferFilterBar";
import MealOfferSearchBar from "../../components/MealOffers/MealOfferSearchBar";
import HomeScreenHeading from "../../components/ui/HomeScreenHeading/HomeScreenHeading";
import { getCookie } from "../../utils/auth/CookieProvider";
import { getUser } from "../../api/userApi";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";

export const MealOfferScreen = () => {
  const userId = getCookie("userId");

  const [firstName, setFirstName] = useState("");

  useQuery(["getUser", userId], () => getUser(), {
    onSuccess: (response) => {
      setFirstName(response.data.firstName as string);
    },
    enabled: !!userId,
  });

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
  const [category, setCategory] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  const queryKey = "getOffers";

  const pageLimit = 12;

  const { data, fetchNextPage, isFetchingNextPage, isFetching, isFetched } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = 1 }) => {
        const allergensQuery: string[] | undefined = allergen?.map(
          (allerg) => allerg.value
        );

        return getMealOffersByParams(
          pageParam,
          pageLimit,
          distance,
          portions,
          category,
          allergensQuery,
          sellerRating,
          price,
          search,
          sortingRule
        );
      },
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
    sortingRule,
    queryClient,
    fetchNextPage,
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

  const handleChangedFilter = (event: any) => {
    if (event.target) {
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
          break;
        case "category":
          setCategory(() =>
            event.target.value === "None" ? undefined : event.target.value
          );
          break;
      }
    } else {
      setAllergen(event);
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
        <HomeScreenHeading>
          Hello
          {firstName.length > 0 && (
            <>
              {" "}
              <u>{firstName}</u>
            </>
          )}
          , what do you want to eat today?
        </HomeScreenHeading>
        <MealOfferSearchBar
          handleSearch={handleSearch}
          handleSort={handleSort}
          currentSearchString={search}
          currentSortingRule={sortingRule}
        ></MealOfferSearchBar>
        <MealOfferFilterBar
          distance={distance}
          handleChangedFilter={handleChangedFilter}
          allergen={allergen}
          category={category}
          maxPrice={price}
          portions={portions}
          sellerRating={sellerRating}
          buttonAction={resetFilters}
        />
        <hr />
        <Row className={"mb-3 justify-content-center"}>
          {isFetching || isFetchingNextPage ? (
            "Loading meals..."
          ) : (
            <>
              {isFetched && data ? (
                <>
                  {data.pages[0].total_count} meal
                  {data.pages[0].total_count != 1 && "s"} found
                </>
              ) : (
                <>
                  Oops, there seems to be something wrong with our server. We
                  are working on it!
                </>
              )}
            </>
          )}
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
                    image={`${new ConfigService().get("MEAL_IMAGES_URL")}/${
                      mealOffer.image
                    }`}
                  />
                </Col>
              ));
            })}
        </Row>
      </Container>
    </>
  );
};
