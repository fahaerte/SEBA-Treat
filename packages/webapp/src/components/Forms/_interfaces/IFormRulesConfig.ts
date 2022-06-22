type TFormRuleInput<T> = {
  value: T;
  message?: string;
};
export interface IFormRulesConfig {
  required?: TFormRuleInput<boolean>;
  min?: TFormRuleInput<number | string>;
  max?: TFormRuleInput<number | string>;
  minLength?: TFormRuleInput<number>;
  maxLength?: TFormRuleInput<number>;
  pattern?: TFormRuleInput<RegExp>;
}

type TFormRule<T> = {
  value: T;
  message: string;
};
export interface IFormRules {
  required?: TFormRule<boolean>;
  min?: TFormRule<number | string>;
  max?: TFormRule<number | string>;
  minLength?: TFormRule<number>;
  maxLength?: TFormRule<number>;
  pattern?: TFormRule<RegExp>;
}

export class CFormRule<T> {
  value: T;
  message: string;

  constructor(val: T, m: string) {
    this.value = val;
    this.message = m;
  }
}
