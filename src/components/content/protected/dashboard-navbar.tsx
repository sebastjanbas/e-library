"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  CircleHelp,
  LogOut,
  User as UserLogo,
  Users,
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const DashboardNavbar = () => {
  const { user } = useUser();

  return (
    <div className="fixed z-50 overflow-hidden top-0 inset-0 bg-background/90 h-20 max-w-5xl left-[50%] -translate-x-[50%] flex flex-row justify-between items-center w-full px-6 py-3">
      <div className="flex gap-8 flex-row items-center justify-evenly font-medium tracking-wide">
        <Link href={"/"} className="text-foreground hover:text-foreground/20">
          <Image src={"/logo.svg"} width={32} height={32} alt="Company Logo" />
        </Link>
        <Link href={"/"} className="text-foreground hover:text-foreground/60">Home</Link>
        <Link href={"/rooms"} className="text-foreground hover:text-foreground/60">Libraries</Link>
        <Link href={"/books"} className="text-foreground hover:text-foreground/60">Books</Link>
        <Link href={"#"} className="text-foreground hover:text-foreground/60">Goals</Link>
        <Link href={"#"} className="text-foreground hover:text-foreground/60">Notes</Link>
        <Link href={"#"} className="text-foreground hover:text-foreground/60">Achievements</Link>
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 rounded-full cursor-pointer">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.fullName ?? "Profile picture"}
              />
              <AvatarFallback className="rounded-lg">
                {user?.firstName ? user.firstName[0] : ""}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px]">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.fullName ?? "Profile picture"}
                  />
                  <AvatarFallback className="rounded-lg">T</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex flex-row justify-between items-center">
                    <span className="truncate gap-3 font-semibold">
                      {user?.fullName}
                    </span>
                  </div>
                  <span className="truncate text-xs">{user?.fullName}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/account"}>
              <DropdownMenuItem className="cursor-pointer">
                <UserLogo />
                Account
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem disabled className="italic">
              <Users /> Friends (comming soon)
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="italic">
              <Archive /> Archive (comming soon)
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="italic">
              <CircleHelp /> Help (comming soon)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full cursor-pointer">
              <LogOut />
              <SignOutButton redirectUrl="/home">
                <span className="cursor-pointer">Log out</span>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardNavbar;
