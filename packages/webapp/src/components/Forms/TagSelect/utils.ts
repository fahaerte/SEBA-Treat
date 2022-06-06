import { GroupBase, StylesConfig } from "react-select";
import { defaultTheme } from "../../../assets/themes/defaultTheme";
import { ITagSelectOption } from "./ITagSelect";

export const customStyles: (
  color: string,
  isValid: boolean
) => StylesConfig<ITagSelectOption, boolean, GroupBase<ITagSelectOption>> = (
  color,
  isValid
) => {
  return {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: `${
        state.isFocused
          ? defaultTheme.palette[color].hover
          : state.isSelected
          ? defaultTheme.palette[color].hover
          : ""
      }`,
      height: `${defaultTheme.form.element.height} / 1.25`,
      lineHeight: `${defaultTheme.form.element.lineHeight}rem`,
      paddingTop: `calc(((${defaultTheme.form.element.height} / 1.25) - ${defaultTheme.form.element.lineHeight}rem) / 2)`,
      fontFamily: defaultTheme.typography.body.family,
      ":active": {
        backgroundColor: defaultTheme.palette[color].main,
        color: defaultTheme.palette[color].contrastText,
      },
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: `${
        !isValid
          ? defaultTheme.palette.danger.main
          : state.isFocused
          ? defaultTheme.palette[color].main
          : ""
      }`,
      minHeight: defaultTheme.form.element.height,
      fontFamily: defaultTheme.typography.body.family,
      boxShadow: `${
        !isValid
          ? defaultTheme.palette.danger.main
          : state.isFocused
          ? `0 0 0 calc(${defaultTheme.typography.size.xxs} / 10) ${defaultTheme.palette[color].main}`
          : ""
      }`,
      ":hover": {
        borderColor: `${
          !isValid
            ? defaultTheme.palette.danger.main
            : state.isFocused
            ? defaultTheme.palette[color].main
            : ""
        }`,
        boxShadow: `${
          !isValid
            ? defaultTheme.palette.danger.main
            : state.isFocused
            ? `0 0 0 calc(${defaultTheme.typography.size.xxs} / 10) ${defaultTheme.palette[color].main}`
            : ""
        }`,
      },
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: defaultTheme.palette[color].main,
      height: "100%",
      ":hover": {
        color: defaultTheme.palette[color].active,
        backgroundColor: defaultTheme.palette[color].hover,
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      height: `calc(${defaultTheme.form.element.height} / 1.618)`,
      lineHeight: `calc(${defaultTheme.form.element.height} / 3.236)`,
      " > div": {
        margin: "auto",
      },
    }),
  };
};
