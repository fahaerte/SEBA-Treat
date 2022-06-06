import { Dispatch, SetStateAction } from "react";

export interface IModalObject {
  open: Dispatch<SetStateAction<boolean>>;
  markup: JSX.Element;
}

export interface IModalTemplate {
  close: () => void;
  confirm: () => void;
}
