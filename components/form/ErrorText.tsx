import { FieldError } from "react-hook-form";
const ErrorText = ({ error }: { error?: FieldError }) => {
  return (
    <p
      className={` text-end text-sm mb-1 transition ${
        error ? "text-custom-red" : "text-transparent"
      }`}
    >{`${error?.message}`}</p>
  );
};
export default ErrorText;
