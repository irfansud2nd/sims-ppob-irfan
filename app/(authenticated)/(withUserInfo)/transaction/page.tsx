import TransactionHistory from "@/components/pages/Transaction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Transaksi",
};

const page = () => {
  return <TransactionHistory />;
};
export default page;
