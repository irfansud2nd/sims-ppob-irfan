import { Metadata } from "next";

import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = {
  title: "Daftar",
};

const page = () => {
  return <AuthPage register />;
};
export default page;
