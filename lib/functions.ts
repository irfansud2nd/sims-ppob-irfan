import { toast } from "sonner";
import axiosInstance from "./axiosInstance";
import { Service } from "./redux/serviceSlice";
import { User } from "./redux/userSlice";

export const toastError = (error: any, id?: string | number) => {
  if (typeof error == "string") {
    toast.error(error, { id });
    return;
  }
  let errorObj = error.response.data as {
    message: string;
    status: number;
  };

  toast.error(errorObj.message + " | " + errorObj.status, { id });
};

export const formatToRupiah = (input: string | number, rerverse?: boolean) => {
  if (rerverse) {
    return input.toString().replace(/[^0-9]/g, "");
  }
  return `Rp ${Math.abs(Number(input)).toLocaleString("id")}`;
};

export const formatDate = (input: string) => {
  const dateObj = new Date(input);
  const date = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleDateString("id", { month: "long" });
  const year = dateObj.getFullYear().toString();
  const hour = dateObj.getHours().toString().padStart(2, "0");
  const minute = dateObj.getMinutes().toString().padStart(2, "0");

  const result = `${date} ${month} ${year}   ${hour}:${minute} WIB`;
  return result;
};

export const fetchBalance = async () => {
  try {
    const response = await axiosInstance.get("/balance");
    return response.data.data.balance as number;
  } catch (error) {
    throw error;
  }
};

export const fetchServices = async () => {
  try {
    const response = await axiosInstance.get("/services");
    return response.data.data as Service[];
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    let user = response.data.data as User;
    if (user.profile_image.endsWith("null")) user.profile_image = "";
    return user;
  } catch (error) {
    throw error;
  }
};

export const reduceData = <T extends Record<string, any>>(
  data: T[],
  key: keyof T = "id"
): T[] => {
  const reducedData = Object.values(
    data.reduce((acc, obj) => {
      acc[obj[key]] = obj;
      return acc;
    }, {} as Record<string, T>)
  );
  return reducedData;
};
