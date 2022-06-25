import { IFormElementConfig } from "../_interfaces/IFormElementConfig";
import { IFormInputConfig } from "../Input/IInput";
import { IFormDatePickerConfig } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
// import { IFormDropzoneConfig } from "../Dropzone/IDropzone";
import { IFormTextAreaConfig } from "../TextArea/ITextArea";
import { IFormRadioCheckSwitchConfig } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IFormRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { IFormTagSelectConfig } from "../TagSelect/ITagSelect";

abstract class FormHelper {
  public static createInput = <T>(
    config: IFormInputConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "input",
    config,
  });

  public static createDatePicker = <T>(
    config: IFormDatePickerConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "datepicker",
    config,
  });

  public static createSelect = <T>(
    config: IFormSelectConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "select",
    config,
  });

  // public static createDropzone = <T>(
  //   config: IFormDropzoneConfig<T>
  // ): IFormElementConfig<T> => ({
  //   elementType: "file",
  //   config,
  // });

  public static createTextArea = <T>(
    config: IFormTextAreaConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "textarea",
    config,
  });

  public static createRadioCheckSwitch = <T>(
    config: IFormRadioCheckSwitchConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "radioCheckSwitch",
    config,
  });

  public static createRadioCheckSwitchGroup = <T>(
    config: IFormRadioCheckSwitchGroupConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "radioCheckSwitchGroup",
    config,
  });

  public static createTagSelect = <T>(
    config: IFormTagSelectConfig<T>
  ): IFormElementConfig<T> => ({
    elementType: "tagSelect",
    config,
  });

}

export default FormHelper;
