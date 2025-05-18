import Navbar from "@/components/content/navbar";
import React, { PropsWithChildren } from "react";

const UnprotectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UnprotectedLayout;
