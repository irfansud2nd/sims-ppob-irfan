import Service from "@/components/pages/Service";
import { Metadata } from "next";

type Props = { params: { code: string } };

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Pembayaran ${params.code}`,
  };
}

const page = ({ params }: Props) => {
  return <Service code={params.code} />;
};
export default page;
