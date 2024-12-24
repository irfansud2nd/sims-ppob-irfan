import Banners from "@/components/dashboard/Banners";
import Services from "@/components/dashboard/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
};

const page = () => {
  return (
    <div className="space-y-2">
      <Services />
      <Banners />
    </div>
  );
};
export default page;
