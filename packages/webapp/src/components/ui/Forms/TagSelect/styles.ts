import { GroupBase, StylesConfig } from "react-select";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";
import { DefaultTheme } from "styled-components";

export const customStyles: (
  color: string,
  isInvalid: boolean,
  theme: DefaultTheme,
  filterSelect?: boolean
) => StylesConfig<TOptionValuePair, boolean, GroupBase<TOptionValuePair>> = (
  color,
  isInvalid,
  theme,
  filterSelect = false
) => {
  return {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: `${
        state.isFocused
          ? theme.palette[color].hover
          : state.isSelected
          ? theme.palette[color].active
          : "white"
      }`,
      lineHeight: `${theme.form.control.lineHeight}`,
      paddingTop: `calc(((${theme.form.control.height} / 1.25) - ${theme.form.control.lineHeight}) / 2)`,
      fontFamily: `${theme.typography.body.family}`,
      height: `calc(${theme.form.control.height} / 1.25)`,
      ":active": {
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    control: (provided, state) => ({
      ...provided,
      fontSize: `${filterSelect ? "0.8rem" : ""}`,
      borderRadius: `${
        filterSelect
          ? theme.general.border.radius
          : theme.form.control.border.radius
      }`,
      borderColor: `${
        isInvalid
          ? theme.palette.danger.main
          : state.isFocused
          ? theme.palette[color].main
          : theme.general.border.color.secondary
      }`,
      minHeight: `${
        filterSelect ? "calc(3.5rem + 2px)" : theme.form.control.height
      }`,
      fontFamily: theme.typography.body.family,
      boxShadow: `${
        isInvalid
          ? theme.palette.danger.main
          : state.isFocused
          ? "0 0 0 0.15rem #8e9e9b"
          : ""
      }`,
      ":hover": {
        borderColor: `${
          isInvalid
            ? theme.palette.danger.main
            : state.isFocused
            ? theme.palette[color].main
            : theme.general.border.color
        }`,
        boxShadow: `${
          isInvalid
            ? theme.palette.danger.main
            : state.isFocused
            ? `0 0 0 calc(${theme.typography.size.xxs} / 10) ${theme.palette[color].main}`
            : ""
        }`,
      },
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme.palette[color].main,
      height: "100%",
      ":hover": {
        color: theme.palette[color].active,
        backgroundColor: theme.palette[color].hover,
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      //height divided by the golden cut(and doubled golden cut)
      height: `calc(${theme.form.control.height} / 1.618)`,
      lineHeight: `calc(${theme.form.control.height} / 3.236)`,
      " > div": {
        margin: "auto",
      },
    }),
  };
};
