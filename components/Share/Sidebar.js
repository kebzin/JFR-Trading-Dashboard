"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboardIcon,
  MapPinned,
  Settings,
  ShoppingBagIcon,
  ShoppingCartIcon,
  User2,
  UserCircle2Icon,
  Users2,
} from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // const { userId } = useAuth();

  const sidebarLinks = [
    {
      imgURL: <LayoutDashboardIcon />,
      route: "/",
      label: "Dashboard",
    },
    {
      imgURL: <User2 />,
      route: "/staff",
      label: "Staff",
    },
    {
      imgURL: <Users2 />,
      route: "/customer",
      label: "Customer",
    },

    {
      imgURL: <ShoppingCartIcon />,
      route: "/orders",
      label: "Orders",
    },
    {
      imgURL: <ShoppingBagIcon />,
      route: "/product",
      label: "Products",
    },
    {
      imgURL: <MapPinned />,
      route: "/tracking",
      label: "Track",
    },
  ];

  return (
    <aside className="fixed top-24 bottom-0 left-0 z-10 hidden  flex-col border-r bg-background  sm:flex">
      <nav className="grid items-start  text-sm font-medium lg:px-3 gap-2">
        {sidebarLinks.map((item) => {
          // const active
          const isActive = pathname === item.route || pathname === item.route;

          return (
            <>
              <Link
                href={item.route}
                className={`flex items-center gap-2 rounded-lg  ${
                  isActive && "bg-primary"
                } px-2 py-2  transition-all`}
              >
                {item.imgURL}
                {item.label}
              </Link>
            </>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
