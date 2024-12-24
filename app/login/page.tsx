import { Metadata } from "next";

import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return <AuthPage />;
};
export default page;
