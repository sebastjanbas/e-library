import DashboardNavbar from "@/components/content/protected/dashboard-navbar";
import MobileNavigation from "@/components/utilities/mobile-navigation";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <MobileNavigation />
      {children}
    </>
  );
};

export default ProtectedLayout;
