export type TError<T> = {
  value: T;
  message?: string;
};

export interface IError {
  required?: TError<boolean>;
  min?: TError<number | string>;
  max?: TError<number | string>;
  minLength?: TError<number>;
  maxLength?: TError<number>;
  pattern?: TError<RegExp>;
}

export class CError<T> {
  value: T;

  message: string;

  constructor(val: T, m: string) {
    this.value = val;
    this.message = m;
  }
}
