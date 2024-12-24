"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AtSign } from "lucide-react";
import InputWithIcon from "../form/InputWithIcon";
import InputPassword from "../form/InputPassword";
import { LoginSchema, loginSchema } from "@/lib/auth/authConstants";
import { toastError } from "@/lib/functions";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseApiUrl } from "@/lib/constants";
import { createSession } from "@/lib/auth/authActions";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await axios.post(baseApiUrl + "/login", data);
      await createSession(response.data.data.token);
      reset();
      router.push("/");
    } catch (error) {
      if ((error as any).response.data.status == 103) {
        setError("email", {
          message: "Email atau Password salah",
        });
        setError("password", {
          message: "Email atau Password salah",
        });
      }
      toastError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <InputWithIcon
        icon={AtSign}
        register={register}
        name="email"
        placeholder="Masukan email anda"
        type="email"
        error={errors.email}
      />

      <InputPassword
        register={register}
        name="password"
        placeholder="Masukan password anda"
        error={errors.password}
      />

      <button type="submit" disabled={isSubmitting} className="btn_red">
        Masuk
      </button>
    </form>
  );
};
export default LoginForm;
