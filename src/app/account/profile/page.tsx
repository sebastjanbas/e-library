import UserInfoForm from "@/components/hooks/forms/user-info-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AccountProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full max-w-4xl px-10 pb-10">
      <div className="py-8">
        <h1 className="text-4xl font-bold">Edit Profile</h1>
        <p>Make changes to your personal information</p>
      </div>

      <div className="flex flex-row gap-10">
        <h4 className="text-sm">Photo</h4>
        <div className="flex flex-col justify-center items-center">
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.full_name}
            />
            <AvatarFallback className="rounded-lg text-2xl">
              {user?.user_metadata.full_name[0]}
            </AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger className="text-sm cursor-pointer hover:underline">Edit</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Placeholder for the image change</DialogTitle>
                <DialogDescription>
                  This is where you are going to be able to change a profile picture
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="my-14">
        <UserInfoForm user={user} />
      </div>
    </div>
  );
};

export default AccountProfilePage;
