import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Tolong lengkapi email" })
    .email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Tolong lengkapi email" })
      .email({ message: "Format email tidak valid" }),
    firstName: z.string().min(1, { message: "Tolong lengkapi nama depan" }),
    lastName: z.string().min(1, { message: "Tolong lengkapi nama belakang" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Tolong lengkapi nama depan" }),
  lastName: z.string().min(1, { message: "Tolong lengkapi nama belakang" }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
