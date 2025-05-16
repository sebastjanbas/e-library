"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed z-50 overflow-hidden flex justify-self-center px-10 py-2 justify-between items-center top-5 inset-0 h-fit rounded-full w-full max-w-xl bg-gray-100">
      <div className="p-0 m-0 h-auto">
        <Link href={"/"}>
          <div className="w-8 h-8 bg-gray-600 rounded-md"></div>
        </Link>
      </div>
      <div className="flex gap-8 text-foreground">
        <Link href={"/pricing"}>
          <span className="text-xs font-medium">Pricing</span>
        </Link>
        <Link href={"#"}>
          <span className="text-xs font-medium">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
