"use client";

import Link from "next/link";
import NavLinks from "./ui/navLinks";
import Image from "next/image";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inter, roboto_mono } from "@/app/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NavBar = () => {
  const { setTheme } = useTheme();
  const { isAuthenticated, user, setIsAuthenticated, logOut } = useSession();
  const router = useRouter();
  const Url = process.env.NEXT_PUBLIC_API;

  const handleLogout = async () => {
    await logOut();
    router.push("/auth/login");
    setIsAuthenticated(false);
  };

  useEffect(() => {}, [isAuthenticated, user]);

  return (
    <section className={`${roboto_mono.className}`}>
      <div className="fixed right-10 top-4 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between items-center border-b h-16 px-[15rem] sticky top-0">
        <div className="text-3xl">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="logo" height={100} width={100} />
          </Link>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <NavLinks />
        </div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 rounded-full overflow-hidden border flex justify-center items-center cursor-pointer">
                <AvatarImage
                  src={`${Url}/public/image/user/${user?.profileImage}`}
                />
                <AvatarFallback className="flex justify-center items-center">
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push("/account/personalize")}
              >
                Personalize
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className={`${inter.className} flex gap-3`}>
            <Link href="/auth/login">
              <Button>Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NavBar;
