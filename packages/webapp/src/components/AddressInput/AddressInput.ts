import { FormHelper, IFormRow } from "../ui";
import { IStringObject } from "@treat/lib-common";

export const addressElement: IFormRow<IStringObject>[] = [
  FormHelper.createInput({
    formKey: "returnedString",
    label: "Address",
    props: {
      type: "text",
    },
    rules: {
      required: { value: true },
    },
    defaultValue: "Arcisstrasse 10, 80333 Munich",
  }),
];
