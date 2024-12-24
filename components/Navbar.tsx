import Link from "next/link";
import logo from "@/public/assets/Logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const links = [
    {
      href: "/topup",
      label: "Top Up",
    },
    {
      href: "/transaction",
      label: "Transaction",
    },
    {
      href: "/account",
      label: "Akun",
    },
  ];

  return (
    <nav className="w-full border-b">
      <div className="xl:container max-xl:px-2 xl:mx-auto py-2 flex items-center w-full justify-between">
        <Link
          href={"/"}
          className="font-semibold text-lg flex items-center gap-x-2"
        >
          <img src={logo.src} className="rounded-full size-8" />
          SIMS PPOB-IRFAN
        </Link>
        <div className="flex gap-x-3 max-sm:hidden">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className="hover:text-custom-red transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden" asChild>
            <Button size={"icon"} variant={"outline"}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sm:hidden">
            {links.map((link) => (
              <DropdownMenuItem asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
export default Navbar;
