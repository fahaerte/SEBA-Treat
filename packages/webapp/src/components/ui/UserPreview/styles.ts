import styled from "styled-components";

export const SCUserPreview = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 2em;

  & > div {
    margin-left: 1em;

    & > div > span.userName {
      font-weight: bold;
    }

    & > div.userRating > div.star-ratings {
      position: relative;
      top: -0.2em;
      margin-right: 0.2em;
    }
  }
`;

export const SCUserPreviewImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: grey;
  display: inline-block;
`;
