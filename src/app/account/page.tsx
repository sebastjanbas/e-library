import Link from "next/link";
import React from "react";
import { BsPaypal } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const AccountOverviewPage = () => {
  return (
    <div className="w-full md:max-w-4xl pb-10">
      <div className="py-8">
        <h1 className="text-4xl font-bold">Account</h1>
        <p>Account Details</p>
      </div>
      <div className="flex flex-col border-[1px] border-foreground/20 rounded-md">
        <div className="-translate-x-1 bg-gradient-to-r my-5 rounded-r-full w-60 text-center text-sm text-white from-blue-500 to-red-500 p-2">
          Member since June 2019
        </div>
        <div className="px-5 pb-3 flex flex-col">
          <h3 className="text-xl font-semibold">Premium plan</h3>
          <p className="text-foreground/60">Next payment: May 14, 2025</p>
          <div className="inline-flex gap-5 pt-5">
            <BsPaypal /> <span className="text-sm italic">mo***@gmail.com</span>
          </div>
          <div className="h-[1px] bg-foreground/30 w-full mt-5"></div>
        </div>
        <Link href={"/account/membership"} className="w-full px-2">
          <div className="inline-flex justify-between w-full hover:bg-foreground/5 p-3 mb-3 cursor-pointer rounded-md items-center transition-colors duration-200 ease-in-out">
            Manage membership <IoIosArrowForward />
          </div>
        </Link>
      </div>
      <div className="my-10">
        Quick links
      </div>
    </div>
  );
};

export default AccountOverviewPage;
