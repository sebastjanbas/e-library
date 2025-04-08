import React from "react";
import AvatarIcon from "./user/avatar-icon";
import LogoutButton from "@/components/auth/logout-button";

const DashboardNavbar = () => {
  return (
    <div className="fixed top-0 flex flex-row justify-between items-center w-full px-6 py-3 border-b-[1px] border-foreground/10">
      <p>Dashboard Navbar</p>
      <div className="flex flex-row gap-2 items-center justify-center">
        <AvatarIcon />
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardNavbar;
