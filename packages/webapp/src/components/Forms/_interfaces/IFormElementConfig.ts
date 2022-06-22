import { IFormInputConfig } from "../Input/IInput";
import { IFormDatePickerConfig } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
import { IFormDropzoneConfig } from "../Dropzone/IDropzone";
import { IFormTextAreaConfig } from "../TextArea/ITextArea";
import { IFormRadioCheckSwitchConfig } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IFormRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { IFormTagSelectConfig } from "../TagSelect/ITagSelect";
import { IFormRichTextConfig } from "../RichText/IRichText";

export type IFormElementConfig<TFormValues> = (
  | IFormSelectConfig<TFormValues>
  | IFormDatePickerConfig<TFormValues>
  | IFormInputConfig<TFormValues>
  | IFormDropzoneConfig<TFormValues>
  | IFormRadioCheckSwitchConfig<TFormValues>
  | IFormTextAreaConfig<TFormValues>
  | IFormRadioCheckSwitchGroupConfig<TFormValues>
  | IFormTagSelectConfig<TFormValues>
  | IFormRichTextConfig<TFormValues>
) & {
  elementType:
    | "input"
    | "textarea"
    | "select"
    | "tagSelect"
    | "file"
    | "datepicker"
    | "radioCheckSwitch"
    | "radioCheckSwitchGroup"
    | "richText";
};
export type IFormRow<TFormValues> =
  | IFormElementConfig<TFormValues>
  | IFormElementConfig<TFormValues>[];
