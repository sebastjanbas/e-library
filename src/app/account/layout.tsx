import { ArrowLeftIcon, CreditCard, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-20 flex flex-row p-5 justify-self-center justify-center items-start w-full max-w-6xl">
      <div className="flex-1/5 flex flex-col gap-5">
        <div className="my-10 text-sm hover:underline">
          <Link href={"/"} className="inline-flex gap-2 w-full h-full">
            <ArrowLeftIcon size={20} /> Back to Dashboard
          </Link>
        </div>
        <div className="w-[80%] rounded-lg hover:bg-foreground/10 p-3 cursor-pointer">
          <Link
            className="inline-flex gap-2 w-full h-full"
            href={"/account"}
          >
            <Home />
            Overview
          </Link>
        </div>
        <div className="w-[80%] rounded-lg hover:bg-foreground/10 p-3 cursor-pointer">
          <Link
            className="inline-flex gap-2 w-full h-full"
            href={"/account/membership"}
          >
            <CreditCard />
            Membership
          </Link>
        </div>
        <div className="w-[80%] rounded-lg hover:bg-foreground/10 p-3 cursor-pointer">
          <Link
            className="inline-flex gap-2 w-full h-full"
            href={"/account/security"}
          >
            <ShieldCheck />
            Security
          </Link>
        </div>
      </div>
      <div className="flex-4/5">{children}</div>
    </div>
  );
};

export default AccountLayout;
