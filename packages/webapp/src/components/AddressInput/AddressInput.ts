import { FormHelper, IFormRow } from "../ui";
import { IStringObject } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";

const address = getCookie("address");

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
