import { UseFormRegister, FieldError } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
  readOnly?: boolean;
};

export const baseApiUrl = "https://take-home-test-api.nutech-integrasi.com";
