'use client'
import { Home, Library, BookText, NotebookPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavigation = () => {
  const pathname = usePathname()

  return (
    <div
      className="fixed z-50 bottom-0 w-full px-5 py-4 rounded-t-3xl bg-white flex flex-row justify-evenly items-center"
      style={{ boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)" }}
    >
      <Link href={"/"} className="inline-flex gap-1 items-center">
        <Home size={24} className={pathname === '/' ? 'text-foreground' : 'text-foreground/30'} />
      </Link>
      <Link href={"/rooms"} className="inline-flex gap-1 items-center">
        <Library size={24} className={pathname === '/rooms' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
      <Link href={"/books"} className="inline-flex gap-1 items-center">
        <BookText size={24} className={pathname === '/books' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
      <Link href={"#"} className="inline-flex gap-1 items-center">
        <NotebookPen size={24} className={pathname === '#' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
    </div>
  );
};

export default MobileNavigation;
