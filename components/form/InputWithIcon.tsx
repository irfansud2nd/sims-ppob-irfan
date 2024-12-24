import React from "react";
import { Input } from "../ui/input";
import { InputProps } from "@/lib/constants";
import ErrorText from "./ErrorText";

type Props = InputProps & {
  icon: React.ElementType;
};

const InputWithIcon: React.FC<Props> = ({
  icon: Icon,
  register,
  name,
  placeholder = "Masukkan nilai",
  type = "text",
  error,
  readOnly,
}) => {
  return (
    <div>
      <div className="relative">
        <Input
          {...register(name)}
          className={`ps-9 ${
            error && "border-custom-red focus-visible:ring-custom-red"
          }`}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Icon
            size={16}
            strokeWidth={2}
            className={`${error && "stroke-custom-red"}`}
          />
        </div>
      </div>
      <ErrorText error={error} />
    </div>
  );
};

export default InputWithIcon;
