"use client";
import React from "react";
import Link from "next/link";
import LoginDialog from "./login-dialog";

const Navbar = () => {
  return (
    <div className="fixed z-50 overflow-hidden flex justify-self-center px-10 py-2 justify-between items-center top-5 inset-0 h-fit rounded-full w-full max-w-xl bg-gray-100">
      <div className="p-0 m-0 h-auto">
        <Link href={"/"}>
          <div className="w-8 h-8 bg-gray-600 rounded-md"></div>
        </Link>
      </div>
      <div className="flex items-center gap-8 text-foreground">
        <Link href={"/pricing"} className="flex items-stretch">
          <span className="p-0 cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0 md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 transition-all will-change-transform text-xs font-medium">
            Pricing
          </span>
        </Link>
        <LoginDialog trigger="Log in" navbar />
      </div>
    </div>
  );
};

export default Navbar;
