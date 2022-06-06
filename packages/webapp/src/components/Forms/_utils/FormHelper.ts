import { IFormElementConfig } from "../_interfaces/IFormElementConfig";
import { IInputConfig } from "../Input/IInput";
import { IDatePickerConfig } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
import { IDropzoneConfig } from "../Dropzone/IDropzone";
import { ITextAreaConfig } from "../TextArea/ITextArea";
import { IRadioCheckSwitchConfig } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { ITagSelectConfig } from "../TagSelect/ITagSelect";
import { IRichTextConfig } from "../RichText/IRichText";

abstract class FormHelper {
  public static createInput = <T>(
    config: IInputConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "input",
    ...config,
  });

  public static createDatePicker = <T>(
    config: IDatePickerConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "datepicker",
    ...config,
  });

  public static createSelect = <T>(
    config: IFormSelectConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "select",
    ...config,
  });

  public static createDropzone = <T>(
    config: IDropzoneConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "file",
    ...config,
  });

  public static createTextArea = <T>(
    config: ITextAreaConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "textarea",
    ...config,
  });

  public static createRadioCheckSwitch = <T>(
    config: IRadioCheckSwitchConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "radioCheckSwitch",
    ...config,
  });

  public static createRadioCheckSwitchGroup = <T>(
    config: IRadioCheckSwitchGroupConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "radioCheckSwitchGroup",
    ...config,
  });

  public static createTagSelect = <T>(
    config: ITagSelectConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "tagSelect",
    ...config,
  });

  public static createRichText = <T>(
    config: IRichTextConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "richText",
    ...config,
  });
}

export default FormHelper;
