"use client";
import Link from "next/link";
import NavLinks from "./ui/navLinks";
import Image from "next/image";
import { Button } from "./ui/button";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const { setTheme } = useTheme();
  const session = false;
  return (
    <section className="relative">
      <div className="fixed right-10 top-5">
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
      <div className="flex justify-between items-center border-b border-stone-500 h-20 px-[15rem]">
        <div className="text-3xl">
          <Link href={"./"}>
            <Image src="./logo.svg" alt="logo" height={100} width={100}></Image>
          </Link>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <NavLinks />
        </div>
        {session ? (
          <div>user</div>
        ) : (
          <div className="flex gap-3">
            <Button>Log In</Button>
            <Button>Sign up</Button>
          </div>
        )}
      </div>
    </section>
  );
};
export default NavBar;
