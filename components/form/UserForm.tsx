"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AtSign, User } from "lucide-react";
import InputWithIcon from "./InputWithIcon";
import InputPassword from "./InputPassword";
import {
  ProfileSchema,
  RegisterSchema,
  profileSchema,
  registerSchema,
} from "@/lib/auth/authConstants";
import axios from "axios";
import { baseApiUrl } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toastError } from "@/lib/functions";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect } from "react";
import useModal from "@/hooks/useModal";

type Props = {
  profile?: ProfileSchema & {
    email: string;
    onComplete: (value: ProfileSchema) => void;
  };
  readOnly?: boolean;
};

const UserForm = ({ profile, readOnly }: Props) => {
  const router = useRouter();

  const schema = profile ? profileSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    getValues,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      password: "",
    },
  });

  const { Modal, showModal } = useModal();

  const onSubmit = async (data: RegisterSchema) => {
    if (readOnly) return;
    try {
      let response: any;
      if (!profile) {
        response = await axios.post(baseApiUrl + "/registration", {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          password: data.password,
        });
      } else {
        response = await axiosInstance.put("/profile/update", {
          first_name: data.firstName,
          last_name: data.lastName,
        });
      }

      if (profile) {
        profile.onComplete({
          firstName: data.firstName,
          lastName: data.lastName,
        });
        showModal("Memperbarui profil", "success");
      } else {
        toast.success(response.data.message);
        reset();
        router.push("/login");
      }
    } catch (error) {
      if ((error as any).response.data.status == 102) {
        setError("email", {
          message: "Email telah digunakan",
        });
      }

      if (profile) {
        toastError(error);
      } else {
        showModal("Memperbaharui profil", "error");
      }
    }
  };

  useEffect(() => {
    if (profile && readOnly) {
      if (
        getValues("firstName") !== profile.firstName ||
        getValues("lastName") !== profile.lastName
      ) {
        setValue("firstName", profile.firstName);
        setValue("lastName", profile.lastName);
      }
    }
  }, [profile, readOnly]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {profile && Modal}
      <InputWithIcon
        icon={AtSign}
        register={register}
        name="email"
        placeholder="Masukan email anda"
        type="email"
        error={errors.email}
        readOnly={!!profile}
      />

      <InputWithIcon
        icon={User}
        register={register}
        name="firstName"
        placeholder="Nama depan"
        type="text"
        error={errors.firstName}
        readOnly={readOnly}
      />

      <InputWithIcon
        icon={User}
        register={register}
        name="lastName"
        placeholder="Nama belakang"
        type="text"
        error={errors.lastName}
        readOnly={readOnly}
      />

      {!profile && (
        <>
          <InputPassword
            register={register}
            name="password"
            placeholder="Masukan password anda"
            error={errors.password}
          />

          <InputPassword
            register={register}
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            error={errors.confirmPassword}
          />
        </>
      )}

      {!readOnly && (
        <button type="submit" disabled={isSubmitting} className="btn_red">
          {profile ? "Simpan" : "Registrasi"}
        </button>
      )}
    </form>
  );
};
export default UserForm;
