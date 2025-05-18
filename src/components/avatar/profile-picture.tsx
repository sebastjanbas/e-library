"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import UploadCareInput from "@/components/ui/uploadcare";
import { useUser } from "@clerk/nextjs";

export function extractId(url: string) {
  const pathname = new URL(url).pathname;
  return pathname.split("/")[1];
}

const ProfilePicture = () => {
  const { user } = useUser();

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full">
        <AvatarImage src={user?.imageUrl} alt={"Profile photo"} />
        <AvatarFallback className="rounded-lg text-2xl">
          {user?.firstName ? user.firstName[0] : ""}
        </AvatarFallback>
      </Avatar>
      {/* <UploadCareInput userImage={user?.user_metadata.avatar_url} /> */}
    </>
  );
};

export default ProfilePicture;
