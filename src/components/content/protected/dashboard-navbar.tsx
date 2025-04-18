import React from "react";
import AvatarIcon from "./user/avatar-icon";
import LogoutButton from "@/components/auth/logout-button";
import Link from "next/link";

const DashboardNavbar = () => {
  return (
    <div className="fixed z-50 overflow-hidden top-0 inset-0 bg-background/90 h-20 flex flex-row justify-between items-center w-full px-6 py-3 border-b-[1px] border-foreground/10">
      <Link href={"/"}>
        <p>Dashboard Navbar</p>
      </Link>
      <div className="flex flex-row gap-2 items-center justify-center">
        <AvatarIcon />
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardNavbar;
