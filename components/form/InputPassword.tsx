import React, { useState } from "react";
import { Input } from "../ui/input";
import { InputProps } from "@/lib/constants";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import ErrorText from "./ErrorText";

const InputPassword: React.FC<InputProps> = ({
  register,
  name,
  placeholder = "Masukkan nilai",
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <Input
          {...register(name)}
          className={`ps-9 pe-9 ${
            error && "border-custom-red focus-visible:ring-custom-red"
          }`}
          placeholder={placeholder}
          type={passwordVisible ? "text" : "password"}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <LockKeyhole
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className={`${error && "stroke-custom-red"}`}
          />
        </div>
      </div>
      <ErrorText error={error} />
    </div>
  );
};

export default InputPassword;
