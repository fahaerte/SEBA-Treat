import React, { useEffect, useState } from "react";
import { UserOverview } from "../../components/Profile/UserOverview";
import {
  Button,
  Container,
  Icon,
  IFormRow,
  FormHelper,
  Form,
  PageHeading,
  SectionHeading,
} from "../../components";
import { TransactionHistory } from "../../components/TransactionHistory/TransactionHistory";
import { IUser } from "@treat/lib-common/lib/interfaces/_index";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";

export const ProfileScreen = () => {
  const userId = getCookie("userIs");
  const { isLoading, data } = useQuery(["getUser", userId], () => getUser());

  const [onUserEdit, setOnUserEdit] = useState(false);
  const [formElements, setFormElements] = useState<IFormRow<IUser>>([]);

  // useEffect = () => {};
  const userEditElements: IFormRow<IUser>[] = [];
  return (
    <>
      <Container>
        <PageHeading>
          My <u>Profile</u>
        </PageHeading>
        <SectionHeading>
          Your Profile Information{" "}
          {onUserEdit ? (
            ""
          ) : (
            <Button onClick={() => setOnUserEdit(true)}>
              <Icon type={"pen"} />
            </Button>
          )}
        </SectionHeading>

        {onUserEdit ? "on edit" : <UserOverview />}
        <TransactionHistory />
      </Container>
    </>
  );
};
