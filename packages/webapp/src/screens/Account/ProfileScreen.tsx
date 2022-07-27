import React from "react";
import { Container, PageHeading, Typography } from "../../components";

export const ProfileScreen = ({ children }: { children?: React.ReactNode }) => (
  <>
    <Container>
      <PageHeading>
        My <u>Profile</u>
      </PageHeading>
      <Typography variant={"div"} className={"mt-3"}>
        This is your personal space.
        <br />
        Here, you can access all of your transactions and edit your personal
        information.
      </Typography>
      {children}
    </Container>
  </>
);
