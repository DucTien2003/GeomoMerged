// @ts-ignore
import { isEmpty } from "@/utils";

/**
 *
 * @param fieldName
 * @param type: value allow number => set type = number because type default is string
 * @param trigger
 * @param whitespace
 * @param required
 */
export const requiredRule = (
  fieldName: string = "",
  trigger: string | string[] = "blur",
  type: string = "string",
  whitespace: boolean = true,
  required: boolean = true,
) => {
  return {
    message: "Please enter your " + fieldName + ".",
    trigger,
    type,
    whitespace,
    required,
  };
};

export const minLengthRule = (
  fieldName: string = "",
  minNumber: number = 1,
  trigger: string = "blur",
) => {
  return {
    message: `${fieldName} must be at least ${minNumber} characters long.`,
    min: minNumber,
    trigger,
  };
};

//https://github.com/yiminghe/async-validator#type
export const requiredTypeRule = (
  fieldName: string = "",
  type: string = "integer",
  trigger: string = "blur",
) => {
  return {
    message: `${fieldName} is invalid.`,
    type,
    trigger,
  };
};

export const requiredNumber = (
  fieldName: string = "",
  trigger: string = "blur",
) => {
  return {
    pattern: /^\d+$/,
    message: `${fieldName} can only contain digits.`,
    trigger,
  };
};

export const confirmPassword = (
  password: string = "",
  valueConfirm: string = "",
  trigger: string = "blur",
) => {
  return {
    validator() {
      if (valueConfirm !== password) {
        return Promise.reject("The password confirmation does not match.");
      } else {
        return Promise.resolve();
      }
    },
    trigger,
  };
};
