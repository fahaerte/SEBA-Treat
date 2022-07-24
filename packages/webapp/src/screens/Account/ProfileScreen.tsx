import React, { useState } from "react";
import { UserOverview } from "../../components/Profile/UserOverview";
import { Container, PageHeading } from "../../components";

export const ProfileScreen = () => {
  const [onUserEdit, setOnUserEdit] = useState(false);

  return (
    <>
      <Container>
        <PageHeading>My Personal Information</PageHeading>
        {/*<UserOverview />*/}
      </Container>
    </>
  );
};
