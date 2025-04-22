import DashboardNavbar from "@/components/content/protected/dashboard-navbar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
};

export default ProtectedLayout;
