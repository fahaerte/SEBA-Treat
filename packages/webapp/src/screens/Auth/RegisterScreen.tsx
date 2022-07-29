import React from "react";
import {
  Container,
  dangerToast,
  Form,
  FormHelper,
  IFormRow,
  successToast,
  Col,
  Row,
} from "../../components";
import { IUser } from "@treat/lib-common";
import { useMutation } from "react-query";
import { register } from "../../api/authApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/img/neighbors.png";

export const RegisterScreen = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation(register, {
    onSuccess: () => {
      successToast({ message: "Registration successful!" });
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        console.log(error);
        if (error.response.data.message) {
          dangerToast({
            message: "Email already in use!",
          });
        } else {
          const errorMessage = error.response.data["errors"][0] as string;
          dangerToast({
            message: errorMessage,
          });
        }
      } else {
        dangerToast({
          message:
            "Unexpected server error. Your account could not be created.",
        });
      }
    },
  });

  const elements: IFormRow<IUser>[] = [
    [
      FormHelper.createInput({
        formKey: "email",
        label: "Email",
        props: {
          type: "email",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide an email!",
          },
        },
      }),
      FormHelper.createInput({
        formKey: "password",
        label: "Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a password!",
          },
          min: {
            value: 6,
            message: "Your password needs at least 6 characters!",
          },
        },
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "firstName",
        label: "First Name",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
          min: {
            value: 2,
            message: "Your first name needs at least 2 characters!",
          },
        },
      }),
      FormHelper.createInput({
        formKey: "lastName",
        label: "Last Name",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
          min: {
            value: 2,
            message: "Your first name needs at least 2 characters!",
          },
        },
      }),
      FormHelper.createDatePicker({
        formKey: "birthdate",
        label: "Birthdate",
        props: {
          type: "date",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
          max: {
            value: new Date().toISOString().split("T")[0],
            message: "Born in the future? We doubt it.",
          },
        },
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
          required: {
            value: true,
            message: "Please provide a street!",
          },
        },
      }),
      FormHelper.createInput({
        formKey: "address.houseNumber",
        wrapperClasses: "col-md-4",
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
      }),
    ],
    [
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
          minLength: {
            value: 5,
            message: "Your postal code needs exactly 5 digits!",
          },
          maxLength: {
            value: 5,
            message: "Your postal code needs exactly 5 digits!",
          },
        },
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
      }),
    ],
  ];

  const handleRegister = (data: IUser) => {
    registerMutation.mutate(data);
  };

  return (
    <Container>
      <Row alignItems={"center"}>
        <Col md={{ span: 6 }}>
          <div>
            <Form<IUser>
              elements={elements}
              onSubmit={handleRegister}
              formTitle={"Please register!"}
              submitButton={{ children: "Register Now!" }}
              abortButton={{
                children: "Cancel",
                color: "secondary",
                className: "ms-3",
                outline: true,
                onClick: () => navigate("/login"),
              }}
              resetOnSubmit={false}
            />
          </div>
        </Col>
        <Col className={"w-50 d-flex justify-content-end align-content-center"}>
          <img
            src={image}
            alt={"Neighbors.png"}
            width={"650px"}
            height={"100% "}
          />
        </Col>
      </Row>
    </Container>
  );
};
