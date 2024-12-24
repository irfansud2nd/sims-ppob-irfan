import Account from "@/components/pages/Account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akun",
};

const page = () => {
  return <Account />;
};
export default page;
