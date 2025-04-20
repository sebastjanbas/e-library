import HighligthedTabs from "@/components/layout/highlighed-tabs";
import {
  ArrowLeftIcon,
  CreditCard,
  Home,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-14 md:mt-20 flex flex-col md:flex-row p-5 justify-self-center justify-center items-start w-full md:gap-10 md:max-w-6xl">
      <div className="md:flex-1/5 flex flex-row justify-between items-center md:items-start md:flex-col gap-2 md:gap-5 w-full">
        <div className="hidden md:block my-10 text-sm hover:underline">
          <Link href={"/"} className="inline-flex gap-2 w-full h-full">
            <ArrowLeftIcon size={20} /> Back to Dashboard
          </Link>
        </div>
        <HighligthedTabs link="/account">
          <Home className="hidden md:block" />
          Overview
        </HighligthedTabs>
        <HighligthedTabs link="/account/profile">
          <User className="hidden md:block" />
          Profile
        </HighligthedTabs>
        <HighligthedTabs link="/account/membership">
          <CreditCard className="hidden md:block" />
          Membership
        </HighligthedTabs>
        <HighligthedTabs link="/account/security">
          <ShieldCheck className="hidden md:block" />
          Security
        </HighligthedTabs>
      </div>
      <div className="w-full px-5 md:flex-4/5">{children}</div>
    </div>
  );
};

export default AccountLayout;
