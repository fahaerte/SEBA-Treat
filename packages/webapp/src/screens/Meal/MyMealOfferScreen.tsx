import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  PageHeading,
  Row,
  TOptionValuePair,
} from "../../components";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getMealOffersByParams, getOwnMealOffers } from "../../api/mealApi";
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

export const MyMealOfferScreen = () => {
  const userId = getCookie("userId");
  const address = getCookie("address");

  const queryClient = useQueryClient();

  const queryKey = "getOwnMeals";

  const pageLimit = 12;

  const { data, fetchNextPage, isFetchingNextPage, isFetching, isFetched } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = 1 }) => {
        return getOwnMealOffers(address);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          const maxPages = Math.ceil(lastPage.total_count / pageLimit);
          const nextPage = allPages.length + 1;
          return nextPage <= maxPages ? nextPage : undefined;
        },
        onSuccess: () => {
          console.log(data);
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
  }, [queryClient, fetchNextPage]);

  return (
    <>
      <Container>
        <PageHeading>Your meal offers</PageHeading>
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
          {/*{data &&*/}
          {/*  data.pages.map((page) => {*/}
          {/*    return page.data.map((mealOffer: IMealOfferCard) => (*/}
          {/*      <Col key={`${mealOffer._id}-container`}>*/}
          {/*        <MealOffer*/}
          {/*          key={mealOffer._id}*/}
          {/*          mealId={mealOffer._id}*/}
          {/*          price={mealOffer.price}*/}
          {/*          distance={mealOffer.distance}*/}
          {/*          mealTitle={mealOffer.title}*/}
          {/*          portions={mealOffer.portions}*/}
          {/*          sellerRating={mealOffer.user.meanRating}*/}
          {/*          endDate={mealOffer.endDate}*/}
          {/*          sellerName={mealOffer.user.firstName}*/}
          {/*          startDate={mealOffer.endDate}*/}
          {/*          allergensVerified={mealOffer.allergensVerified}*/}
          {/*          categories={mealOffer.categories}*/}
          {/*          image={`${new ConfigService().get("MEAL_IMAGES_URL")}/${*/}
          {/*            mealOffer.image*/}
          {/*          }`}*/}
          {/*        />*/}
          {/*      </Col>*/}
          {/*    ));*/}
          {/*  })}*/}
          {data && "Test"}
        </Row>
      </Container>
    </>
  );
};
