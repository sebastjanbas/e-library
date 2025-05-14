"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadCareInput from "@/components/ui/uploadcare";
import { useUser } from "@/store/useUser";

export function extractId(url: string) {
  const pathname = new URL(url).pathname;
  return pathname.split("/")[1];
}

const ProfilePicture = () => {
  const { user } = useUser();

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full">
        <AvatarImage
          src={user?.user_metadata.avatar_url}
          alt={"Profile photo"}
        />
        <AvatarFallback className="rounded-lg text-2xl">
          {user?.user_metadata.full_name[0]}
        </AvatarFallback>
      </Avatar>
      <UploadCareInput userImage={user?.user_metadata.avatar_url} />
    </>
  );
};

export default ProfilePicture;
