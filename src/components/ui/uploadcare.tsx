/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteImageUploadcare, updateUserAvatar } from "@/actions/update-user";
import { extractId } from "../avatar/profile-picture";

const UploadCareInput = ({ userImage }: { userImage: string }) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    const imageId = extractId(userImage); // extract if from the url
    const response = deleteImageUploadcare(imageId);

    console.log("Delete response: ", response)

  };

  const handleUpload = async (e:any) => {

    if (userImage) {
      onRemoveProfileImage();
    }

    // const imageUrl =
    //   e.cdnUrl + "-/preview/512x512/-/format/auto/-/quality/smart/";
    // const imageUrl = e.cdnUrl+"-/scale_crop/300x300/smart/"
    const imageUrl = e.cdnUrl+"-/crop/face/250px250p/-/scale_crop/300x300/smart/"
    const response = await updateUserAvatar(imageUrl);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response.success) {
      toast.success(response.success);
      // window.location.href = "/settings"; // reload the page for client components
      router.refresh();
    }
  };

  return (
    <FileUploaderRegular
      sourceList="local, camera"
      cameraModes="photo"
      classNameUploader="uc-light uc-gray"
      pubkey="a10e3fd0c610b930ad2e"
      onFileUploadSuccess={(event) => handleUpload(event)}
    />
  );
};



export default UploadCareInput;
