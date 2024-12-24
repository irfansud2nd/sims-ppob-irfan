import UserInfo from "@/components/UserInfo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserInfo />
      {children}
    </>
  );
}
