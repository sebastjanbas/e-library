"use client";
import React from "react";
import Image from "next/image";
import LoginDialog from "./login-dialog";
import SignupDialog from "./signup-dialog";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed z-50 overflow-hidden pr-5 md:px-10 flex justify-center items-center top-0 inset-0 h-20 w-full border-b border-[1px] bg-background/90">
      <div className="w-full max-w-6xl flex flex-row justify-between items-center">
        <div className="w-44 p-0 m-0 h-auto">
          <Image
            src={"/logo.png"}
            width={512}
            height={512}
            alt="Company Logo"
          />
        </div>
        <div className="flex gap-2">
          <LoginDialog
            isOpen={pathname !== "/" ? true : false}
            trigger="Log in"
            navbar
          />
          <div className="h-[30px] w-[1px] bg-foreground/30"></div>
          <SignupDialog trigger="Sign up" navbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
