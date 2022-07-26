import React, { useEffect, useState } from "react";
import {
  FormHelper,
  IFormRow,
  Form,
  dangerToast,
  Icon,
  SkeletonSquare,
  successToast,
} from "../ui";
import { IUser } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useMutation, useQuery } from "react-query";
import { getUser, updateUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export const ProfileUpdate = () => {
  const userId = getCookie("userId");
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useQuery(["getUser", userId], () =>
    getUser()
  );

  const [formElements, setFormElements] = useState<IFormRow<IUser>[]>([]);

  const { mutate: updateUserMutation, isLoading } = useMutation(
    (user: Partial<IUser>) => updateUser({ _id: userId, ...user }),
    {
      onSuccess: () => {
        successToast({ message: "Successfully updated ur information!" });
        navigate("/account");
      },
      onError: () => {
        dangerToast({ message: "Sorry, something went wrong." });
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const user = data.data;
      const userEditElements: IFormRow<IUser>[] = [
        [
          FormHelper.createInput({
            formKey: "email",
            label: "Email",
            disabled: true,
            props: {
              type: "email",
            },
            rules: {
              min: {
                value: 5,
                message: "Your email needs at least 5 characters!",
              },
            },
            defaultValue: user.email,
          }),
        ],
        [
          FormHelper.createInput({
            formKey: "firstName",
            label: "First Name",
            props: {
              type: "text",
            },
            defaultValue: user.firstName,
          }),
          FormHelper.createInput({
            formKey: "lastName",
            label: "Last Name",
            props: {
              type: "text",
            },
            defaultValue: user.lastName,
          }),
          FormHelper.createDatePicker({
            formKey: "birthdate",
            label: "Birthdate",
            disabled: true,
            props: {
              type: "date",
            },
            defaultValue: user.birthdate.split("T")[0],
          }),
        ],
        [
          FormHelper.createInput({
            formKey: "address.street",
            label: "Street",
            props: {
              type: "text",
            },
            rules: {
              minLength: {
                value: 3,
                message: "Please provide a street!",
              },
              maxLength: {
                value: 100,
                message: "Please provide a street!",
              },
            },
            defaultValue: user.address.street,
          }),
          FormHelper.createInput({
            formKey: "address.houseNumber",
            label: "Housenumber",
            props: {
              type: "text",
            },
            rules: {
              required: {
                value: true,
                message: "Please provide your house number!",
              },
            },
            defaultValue: user.address.houseNumber,
          }),
          FormHelper.createInput({
            formKey: "address.postalCode",
            label: "Postal Code",
            props: {
              type: "text",
            },
            rules: {
              required: {
                value: true,
                message: "Please provide a postal code!",
              },
            },
            defaultValue: user.address.postalCode,
          }),
          FormHelper.createInput({
            formKey: "address.city",
            label: "City",
            props: {
              type: "text",
            },
            rules: {
              required: {
                value: true,
                message: "Please provide your city!",
              },
            },
            defaultValue: user.address.city,
          }),
          FormHelper.createInput({
            formKey: "address.country",
            label: "Country",
            props: {
              type: "text",
            },
            rules: {
              required: {
                value: true,
                message: "Please provide your country!",
              },
            },
            defaultValue: user.address.country,
          }),
        ],
      ];

      setFormElements(userEditElements);
    } else if (isError) {
      dangerToast({ message: "Could not get user data!" });
      navigate("/account");
    }
  }, [data, setFormElements, isError, isSuccess, navigate]);

  const handleSubmit = (data: IUser) => {
    if (userId) {
      console.log({ ...data, _id: userId });
      updateUserMutation({ ...data, _id: userId });
    } else {
      dangerToast({
        message: "User does not seem to be authenticated. Please login.",
      });
      navigate("/login");
    }
  };

  return (
    <>
      {isSuccess && formElements.length > 0 ? (
        <Form<IUser>
          elements={formElements}
          onSubmit={(data) => handleSubmit(data)}
          submitButton={{
            children: (
              <>
                <Icon type={"save"} /> Update Information
              </>
            ),
          }}
          isLoading={isLoading}
        />
      ) : (
        <SkeletonSquare rows={3} />
      )}
    </>
  );
};
