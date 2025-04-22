import ProfilePicture from "@/components/avatar/profile-picture";
import UserInfoForm from "@/components/hooks/forms/user-info-form";
import React from "react";

const AccountProfilePage = () => {

  return (
    <div className="w-full md:max-w-4xl pb-10">
      <div className="py-8">
        <h1 className="text-4xl font-bold">Edit Profile</h1>
        <p>Make changes to your personal information</p>
      </div>

      <div className="flex flex-row gap-10">
        <h4 className="text-sm">Photo</h4>
        <div className="flex flex-col justify-center items-center">
          <ProfilePicture />
        </div>
      </div>
      <div className="my-14">
        <UserInfoForm  />
      </div>
    </div>
  );
};

export default AccountProfilePage;
