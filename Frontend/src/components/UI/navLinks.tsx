"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { House,NotebookText} from "lucide-react";
import { Dumbbell } from "lucide-react";

const NavLinks = () => {
  const links = [
    { href: "/", name: "Dashboard", icon: House },
    { href: "/Workout", name: "Workout", icon: Dumbbell },
    { href: "/Blogs", name: "Blogs", icon: NotebookText },
    { href: "/Workout", name: "Workout", icon: Dumbbell },
  ];

  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              { " text-stone-400 border-b-2 border-stone-600": link.href === pathname },
              ` h-[48px] text-sm font-medium hover:text-stone-600 transition-all duration-150 flex justify-center items-center gap-3`,
            )}
          >
            <LinkIcon />
            <p className={`hidden md:block`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
