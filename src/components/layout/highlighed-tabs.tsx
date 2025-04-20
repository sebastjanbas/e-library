"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const HighligthedTabs = ({ link, children } : {link: string, children: React.ReactNode}) => {
  const pathname = usePathname()

  return (
    <div className="w-full md:w-[80%] rounded-lg hover:bg-foreground/10 md:p-3 text-center md:text-start cursor-pointer">
      <Link
        className="md:inline-flex gap-2 w-full h-full text-sm md:text-md"
        href={link}
      >
        {children}
      </Link>
      <div className={`${pathname !== link ? "hidden": "block"} h-[1px] w-full bg-red-500`}></div>
    </div>
  );
};

export default HighligthedTabs;
