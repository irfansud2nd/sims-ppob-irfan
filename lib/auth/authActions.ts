"use server";

import { cookies } from "next/headers";

export const createSession = async (token: string) => {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    maxAge: 12 * 60 * 60,
  });
};

export const getServerSession = async () => {
  return cookies().get("session")?.value;
};

export const clearSession = async () => {
  cookies().delete("session");
};
