import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/redux/ReduxProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <ReduxProvider>
        <div className="xl:mx-auto xl:container max-xl:px-2">{children}</div>
      </ReduxProvider>
    </div>
  );
}
