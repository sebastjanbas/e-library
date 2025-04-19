import ProfilePicture from "@/components/avatar/profile-picture";
import UserInfoForm from "@/components/hooks/forms/user-info-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";

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
          <ProfilePicture userImage={user?.user_metadata.avatar_url} fallback={user?.user_metadata.full_name[0]} />
        </div>
      </div>
      <div className="my-14">
        <UserInfoForm user={user} />
      </div>
    </div>
  );
};

export default AccountProfilePage;
