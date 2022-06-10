import styled from "styled-components";
import { IFormSelectProps } from "./Select/ISelect";
import { IRadioCheckSwitchProps } from "./RadioCheckSwitch/IRadioCheckSwitch";

export const SCFloatingForm = styled.div`
  > .form-control,
  > .form-select {
    line-height: ${({ theme }) => theme.form.element.lineHeight};
    border-radius: ${({ theme }) => theme.general.border.radius};
    border: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.form.element.borderColor};
    color: ${({ theme }) => theme.form.element.color};
    font-size: ${({ theme }) => theme.form.element.fontSize};
    height: ${({ theme }) => theme.form.element.height};
    padding: ${({ theme }) => theme.form.element.padding};
  }

  > label {
    color: ${({ theme }) => theme.form.element.labelColor};
    font-size: ${({ theme }) => theme.form.element.fontSize};
    padding: ${({ theme }) => theme.form.element.padding};
  }
`;

export const SCInput = styled.input`
  &.form-control[type="file"] {
    height: auto;
  }
`;
/*
 &.form-control {
    height: ${({ theme }) => theme.form.element.height};
  }
 */

export const SCCheckbox = styled.input<IRadioCheckSwitchProps>`
  &:checked {
    background-color: ${({ theme, color = "primary" }) =>
      theme.palette[color].main};
    border-color: ${({ theme, color = "primary" }) =>
      theme.palette[color].main};
  }
`;

export const SCSelect = styled.select<IFormSelectProps>``;
/*
 &.form-select {
    ${(props) =>
    props.multiple
      ? ""
      : `height: ${props.theme.form.element.height} !important;`}
  }
 */

export const SCTextArea = styled.textarea`
  &.form-control {
    height: calc(
      ${(props) => props.rows} * ${({ theme }) => theme.form.element.height}
    );
  }
`;
