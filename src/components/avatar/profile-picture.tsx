"use client"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadCareInput from "@/components/ui/uploadcare";

export function extractId(url:string) {
  const pathname = new URL(url).pathname;
  return pathname.split("/")[1];
}


const ProfilePicture = ({userImage, fallback}: {userImage: string, fallback: string}) => {


  return (
    <>
      <Avatar className="h-20 w-20 rounded-full">
        <AvatarImage
          src={userImage}
          alt={"Profile photo"}
        />
        <AvatarFallback className="rounded-lg text-2xl">
          {fallback}
        </AvatarFallback>
      </Avatar>
      <UploadCareInput userImage={userImage} />
    </>
  );
};

export default ProfilePicture;
