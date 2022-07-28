import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Icon,
  PageHeading,
  Row,
  SectionHeading,
  SkeletonSquare,
  Typography,
} from "../../components";
import { ProfileUpdate } from "../../components/Profile/ProfileUpdate";
import { PasswordUpdate } from "../../components/Profile/PasswordUpdate";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { Rating } from "../../components/Profile/Rating";

export const ProfileScreen = () => {
  const userId = getCookie("userId");
  const [userRating, setUserRating] = useState<
    { rating: number; receivedRatings: number } | undefined
  >();

  const { data, isSuccess, isLoading } = useQuery(["getUser", userId], () =>
    getUser()
  );

  useEffect(() => {
    if (isSuccess) {
      setUserRating({
        rating: data.data.meanRating,
        receivedRatings: data.data.countRatings,
      });
    }
  }, [isSuccess, setUserRating, data]);

  return (
    <>
      <Container>
        <PageHeading>
          Your <u>profile</u>
        </PageHeading>
        <Typography variant={"div"} className={"mt-3"}>
          This is your personal space.
          <br />
          Here, you can access all of your transactions and edit your personal
          information.
        </Typography>
        <SectionHeading>
          <Icon type={"star"} /> My rating score
        </SectionHeading>
        {isLoading ? (
          <SkeletonSquare rows={3} />
        ) : (
          <>
            {userRating && (
              <Row className={"w-50 mb-lg"} alignItems={"center"}>
                <Col md={{ span: 7 }}>
                  <Rating rating={userRating.rating} starDimension={"3rem"} />
                  {userRating.receivedRatings > 0 && (
                    <Typography
                      variant={"h2"}
                      display={"inline"}
                      className={"mb-0 ms-3"}
                      verticalMiddle
                    >
                      {userRating.rating}
                    </Typography>
                  )}
                </Col>
                <Col>
                  <Typography variant="h3" display={"inline"}>
                    {userRating.receivedRatings > 0 ? (
                      <>
                        You have in total
                        <u>{userRating.receivedRatings} Ratings</u>
                      </>
                    ) : (
                      "You have not been rated yet."
                    )}
                  </Typography>
                </Col>
              </Row>
            )}
            <Row>
              <Typography variant={"h4"} color={"info"}>
                <Icon type={"infoCircle"} /> How Ratings work:
              </Typography>
              <Typography variant={"div"}>
                The displayed rating is the average rating you have received
                from other users. <br />
                You receive a rating when:
                <ul>
                  <li>
                    You purchase a meal. Then, the seller rates you as a buyer,
                    e.g. reliability or friendliness.
                  </li>
                  <li>
                    You sell an offer. A buyer rates you as a seller, e.g.
                    according to the quality and taste, or trustworthyness.
                  </li>
                </ul>
              </Typography>
            </Row>
          </>
        )}
        <SectionHeading>
          <Icon type={"person"} /> Edit Personal Information
        </SectionHeading>
        <ProfileUpdate />
        <SectionHeading>
          <Icon type={"shield-lock"} /> Update Password
        </SectionHeading>
        <PasswordUpdate />
      </Container>
    </>
  );
};
