import { InputControlledSearch, SelectControlledRound } from "../ui";
import React from "react";
import { ESortingRules } from "@treat/lib-common/lib/enums/ESortingRules";
import styled from "styled-components";

const SCSearchBar = styled.div`
  width: 100%;

  > .inner-search-bar {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > .form-floating:first-child {
      flex-grow: 1;
      margin-right: 1rem;

      > input {
        box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
        border: 2px solid #bfd0cd;
      }
    }

    > .form-floating:last-child {
      width: 25%;
      min-width: 150px;
    }
  }
`;

const MealOfferSearchBar = ({
  handleSearch,
  handleSort,
  currentSearchString,
  currentSortingRule,
}: {
  handleSearch: (event: any) => void;
  handleSort: (event: any) => void;
  currentSearchString: string | undefined;
  currentSortingRule: ESortingRules;
}) => {
  return (
    <>
      <SCSearchBar className={"mt-5 mb-5"}>
        <div className={"inner-search-bar"}>
          <InputControlledSearch
            type={"search"}
            value={currentSearchString as string}
            label={"Search meals in your neighborhood"}
            onChange={handleSearch}
          />
          <SelectControlledRound
            className={"sorting"}
            label={"Sort by"}
            value={currentSortingRule}
            onChange={handleSort}
            size={"sm"}
          >
            <option value={ESortingRules.PRICE_ASC}>
              {ESortingRules.PRICE_ASC.valueOf().charAt(0).toUpperCase() +
                ESortingRules.PRICE_ASC.valueOf().slice(1)}
            </option>
            <option value={ESortingRules.DIST_ASC}>
              {ESortingRules.DIST_ASC.valueOf().charAt(0).toUpperCase() +
                ESortingRules.DIST_ASC.valueOf().slice(1)}
            </option>
            <option value={ESortingRules.RATING_DESC}>
              {ESortingRules.RATING_DESC.valueOf().charAt(0).toUpperCase() +
                ESortingRules.RATING_DESC.valueOf().slice(1)}
            </option>
          </SelectControlledRound>
        </div>
      </SCSearchBar>
    </>
  );
};

export default MealOfferSearchBar;
