import styled from "styled-components";
import { IRadioCheckSwitchProps } from "./RadioCheckSwitch/IRadioCheckSwitch";
import { ISelectProps } from "./Select/ISelect";
import { ITextAreaProps } from "./TextArea/ITextArea";

export const SCFloatingFormSearch = styled.div`
  > .form-control,
  > .form-select {
    line-height: ${({ theme }) => theme.form.control.lineHeight};
    border-radius: 100px;
    border: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.general.border.color.primary};
    color: black;
    font-size: ${({ theme }) => theme.form.control.fontSize};
    height: ${({ theme }) => theme.form.control.height};
    padding: ${({ theme }) => theme.form.control.padding};
  }

  > .form-control:not(:placeholder-shown),
  > .form-select {
    padding-top: 1.5em;
    padding-bottom: 0.5em;
  }

  > label {
    color: ${({ theme }) => theme.form.label.color};
    font-size: ${({ theme }) => theme.form.control.fontSize};
    padding: ${({ theme }) => theme.form.label.padding};
    line-height: ${({ theme }) => theme.form.control.height};
  }

  .is-invalid {
    border-color: ${({ theme }) => theme.palette.danger.main};
  }
`;

export const SCFloatingForm = styled.div`
  > .form-control,
  > .form-select {
    line-height: ${({ theme }) => theme.form.control.lineHeight};
    border-radius: ${({ theme }) => theme.form.control.border.radius};
    border: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.general.border.color.primary};
    color: black;
    font-size: ${({ theme }) => theme.form.control.fontSize};
    height: ${({ theme }) => theme.form.control.height};
    padding: ${({ theme }) => theme.form.control.padding};
  }

  > .form-control:not(:placeholder-shown),
  > .form-select {
    padding-top: 1.5em;
    padding-bottom: 0.5em;
  }

  > label {
    color: ${({ theme }) => theme.form.label.color};
    font-size: ${({ theme }) => theme.form.control.fontSize};
    padding: ${({ theme }) => theme.form.label.padding};
    line-height: ${({ theme }) => theme.form.control.height};
  }

  .is-invalid {
    border-color: ${({ theme }) => theme.palette.danger.main};
  }
`;

export const SCFloatingFormRound = styled.div`
  padding: 0;

  > .form-select {
    padding: 0;
  }

  > .form-control,
  > .form-select {
    border: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.general.border.color.primary};
    color: black;
    font-size: 0.8em;
    border-radius: 100px;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  > label {
    color: ${({ theme }) => theme.form.label.color};
    padding-top: 0.5rem;
    padding-left: 1rem;
    font-size: 0.8rem;
    transform: scale(1) translateY(0) translateX(0) !important;
  }

  .is-invalid {
    border-color: ${({ theme }) => theme.palette.danger.main};
  }
`;

export const SCFormControl = styled.input`
  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.active};
    box-shadow: 0 0 0 0.15rem ${({ theme }) => theme.palette.primary.active};
  }
`;

export const SCInput = styled(SCFormControl)``;

export const SCCheckbox = styled.input<IRadioCheckSwitchProps>`
  &:checked {
    background-color: ${({ theme, color }) =>
      theme.palette[color as string].main};
    border-color: ${({ theme, color }) => theme.palette[color as string].main};
  }

  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.active};
    box-shadow: 0 0 0 0.15rem ${({ theme }) => theme.palette.primary.active};
  }
`;

export const SCSelect = styled.select<ISelectProps>`
  :focus {
    border-color: ${({ theme }) => theme.palette.primary.active};
    box-shadow: 0 0 0 0.15rem ${({ theme }) => theme.palette.primary.active};
  }
`;

export const SCTextArea = styled(SCFormControl)<ITextAreaProps>`
  &.form-control {
    height: calc(
      ${(props) => props.rows} * ${({ theme }) => theme.form.control.height}
    );
  }
`;
