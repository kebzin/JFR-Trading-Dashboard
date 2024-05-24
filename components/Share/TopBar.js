"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Menu, Moon, Package2, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import profilePicture from "../../public/profilePhoto.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "./Sidebar";

function Topbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const pathname = usePathname();

  const router = useRouter();
  const supabase = createClientComponentClient();
  // logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }

      router.refresh();

      setSession(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="fixed top-0 z-30  w-full h-20 ">
      <CardContent>
        <nav className="  w-full flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid items-start  text-sm font-medium lg:px-1 gap-2">
                {sidebarLinks.map((item) => {
                  // const active

                  const isActive =
                    pathname === item.route || pathname === item.route;

                  return (
                    <>
                      <Link
                        href={item.route}
                        className={`flex items-center gap-2  py-2  transition-all`}
                      >
                        <Button
                          variant="outline"
                          className={`w-full flex items-center gap-2 justify-items-center ${
                            isActive && "bg-primary"
                          }`}
                        >
                          {item.imgURL}
                          {item.label}
                        </Button>
                      </Link>
                    </>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="w-full flex items-center gap-4 ">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={250}
              height={75}
              // className="w-full"
            />
            {/* <p className="text-heading3-bold text-light-1 max-xs:hidden">
              Jfr Trading
            </p> */}
          </Link>

          <div className="flex items-center gap-1">
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Image
                    src={profilePicture}
                    height={36}
                    width={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}

export default Topbar;
