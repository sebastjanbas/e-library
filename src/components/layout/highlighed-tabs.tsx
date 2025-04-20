"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const HighligthedTabs = ({ link, children } : {link: string, children: React.ReactNode}) => {
  const pathname = usePathname()

  return (
    <div className="w-full xl:w-[80%] rounded-lg hover:bg-foreground/10 md:p-3 text-center md:text-start cursor-pointer">
      <Link
        className={`md:inline-flex px-3 pb-1 gap-2 w-fit h-full text-sm md:text-md ${pathname === link ? " border-b-red-500 border-b-[1px]" : "border-none"}`}
        href={link}
      >
        {children}
      </Link>
    </div>
  );
};

export default HighligthedTabs;
