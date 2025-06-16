/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Home, Library, BookText, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
import { SignOutButton } from "@clerk/nextjs";

const MobileNavigation = ({user}: any) => {
  const pathname = usePathname()

  return (
    <>
          <div className="flex fixed z-50 overflow-hidden top-0 inset-0 bg-background/90 h-20 w-full justify-center items-center">
      <div className="w-full max-w-5xl flex flex-row justify-between items-center px-6 py-3">
        <div className="flex gap-10 flex-row items-center justify-evenly font-medium tracking-wide">
          <Link href={"/"} className="text-foreground hover:text-foreground/20">
            <Image
              src={"/logo.svg"}
              width={32}
              height={32}
              alt="Company Logo"
            />
          </Link>
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
    </div>

    <div
      className="fixed z-50 bottom-0 w-full px-5 py-4 rounded-t-3xl bg-white flex flex-row justify-evenly items-center"
      style={{ boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)" }}
    >
      <Link href={"/"} className="inline-flex gap-1 items-center">
        <Home size={24} className={pathname === '/' ? 'text-foreground' : 'text-foreground/30'} />
      </Link>
      <Link href={"/rooms"} className="inline-flex gap-1 items-center">
        <Library size={24} className={pathname === '/rooms' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
      <Link href={"/books"} className="inline-flex gap-1 items-center">
        <BookText size={24} className={pathname === '/books' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
      <Link href={"#"} className="inline-flex gap-1 items-center">
        <NotebookPen size={24} className={pathname === '#' ? 'text-foreground' : 'text-foreground/30'}/> 
      </Link>
    </div>
    </>
  );
};

export default MobileNavigation;
