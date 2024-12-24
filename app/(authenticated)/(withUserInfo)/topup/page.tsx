import TopupForm from "@/components/topup/TopupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Up",
};

const page = () => {
  return (
    <div>
      <p className="font-medium">Silahkan masukan</p>
      <h1 className="font-bold text-2xl mb-4">Nominal Top Up</h1>
      <TopupForm />
    </div>
  );
};
export default page;
