import { FormHelper, IFormRow } from "../ui";
import { IStringObject } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";

const address = () => {
  const cookieValue = getCookie("address");
  if (cookieValue) {
    return cookieValue;
  } else {
    return "Arcisstrasse 11, 80335 Munich";
  }
};

export const addressElement: IFormRow<IStringObject>[] = [
  FormHelper.createInput({
    formKey: "returnedString",
    label: "Address",
    labelClass: "text-start",
    props: {
      type: "text",
    },
    rules: {
      required: { value: true },
    },
    defaultValue: address,
  }),
];
