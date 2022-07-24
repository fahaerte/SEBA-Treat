import React from "react";
import { Container, PageHeading, TabBar, Typography } from "../../components";

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
      <TabBar
        className={"mt-5"}
        tabs={[
          {
            to: "/account",
            children: "Personal Information",
          },
          {
            to: "/account/transaction-history",
            children: "Transaction History",
          },
        ]}
      />
      {children}
    </Container>
  </>
);
