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
import { IAddress, IUser } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useMutation, useQuery } from "react-query";
import { getUser, updateUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const ProfileUpdate = () => {
  const userId = getCookie("userId");
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined>();
  const [componentLoading, setComponentLoading] = useState<boolean>(true);
  const { isSuccess, isError } = useQuery(
    ["getUser", userId],
    () => getUser(),
    {
      onSuccess: (response) => {
        setUser(response.data as IUser);
      },
    }
  );

  const {
    mutate: updateUserMutation,
    // isLoading,
    // isSuccess: isUpdateSuccess,
    // data: updatedData,
  } = useMutation(
    (user: Partial<IUser>) => updateUser({ _id: userId, ...user }),
    {
      onMutate: () => {
        setComponentLoading(true);
        setUser(undefined);
      },
      onSuccess: (response) => {
        setUser(response.data as IUser);
        successToast({ message: "Successfully updated ur information!" });
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          dangerToast({
            message: error.response.data.message,
          });
        } else {
          dangerToast({
            message:
              "Unexpected server error. Your profile could not be updated.",
          });
        }
      },
    }
  );

  const generateFormElements = (userElement: IUser): IFormRow<IUser>[] => [
    [
      FormHelper.createInput({
        formKey: "email",
        label: "Email",
        disabled: true,
        props: {
          type: "email",
        },
        defaultValue: userElement.email,
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "firstName",
        label: "First Name",
        props: {
          type: "text",
        },
        defaultValue: userElement.firstName,
      }),
      FormHelper.createInput({
        formKey: "lastName",
        label: "Last Name",
        props: {
          type: "text",
        },
        defaultValue: userElement.lastName,
      }),
      FormHelper.createDatePicker({
        formKey: "birthdate",
        label: "Birthdate",
        disabled: true,
        props: {
          type: "date",
        },
        defaultValue: new Date(userElement.birthdate)
          .toISOString()
          .split("T")[0],
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
        defaultValue: userElement.address.street,
      }),
      FormHelper.createInput({
        formKey: "address.houseNumber",
        label: "Housenumber",
        props: {
          type: "text",
        },
        defaultValue: userElement.address.houseNumber,
      }),
      FormHelper.createInput({
        formKey: "address.postalCode",
        label: "Postal Code",
        props: {
          type: "text",
        },
        defaultValue: userElement.address.postalCode,
      }),
      FormHelper.createInput({
        formKey: "address.city",
        label: "City",
        props: {
          type: "text",
        },
        defaultValue: userElement.address.city,
      }),
      FormHelper.createInput({
        formKey: "address.country",
        label: "Country",
        props: {
          type: "text",
        },
        defaultValue: userElement.address.country,
      }),
    ],
  ];

  useEffect(() => {
    if (user) {
      setComponentLoading(false);
      console.log("im Use Effect");
      console.log(user);
    } else if (isError) {
      dangerToast({ message: "Could not get user data!" });
      navigate("/account");
    }
  }, [
    user,
    componentLoading,
    // setFormElements,
    // setUser,
    setComponentLoading,
    // isUpdateSuccess,
    isError,
    isSuccess,
    navigate,
  ]);

  const handleSubmit = (data: IUser) => {
    if (userId) {
      const userKeys = Object.keys(data);
      const addressKeys = Object.keys(data.address);
      userKeys.forEach((key) => {
        const keyFromInterface = key as keyof IUser;
        if (data[keyFromInterface] === "" && keyFromInterface !== "address") {
          delete data[keyFromInterface];
        }
      });
      addressKeys.forEach((key) => {
        const keyFromInterface = key as keyof IAddress;
        if (data.address[keyFromInterface] === "") {
          delete data.address[keyFromInterface];
        }
      });

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
      {!componentLoading && user ? (
        <Form<IUser>
          resetOnSubmit
          elements={generateFormElements(user)}
          onSubmit={(data) => handleSubmit(data)}
          submitButton={{
            children: (
              <>
                <Icon type={"arrow-clockwise"} /> Update Information
              </>
            ),
          }}
        />
      ) : (
        <SkeletonSquare rows={3} />
      )}
    </>
  );
};
