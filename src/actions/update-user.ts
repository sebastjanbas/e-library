"use server"
import { ProfileInfoSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client"; // delete the image on the uploadcare server


export const updateUserInfo = async (values: z.infer<typeof ProfileInfoSchema>) => {
  const supabase = await createClient(); 

  const { error } = await supabase.auth.updateUser({ 
    data: {full_name:values.firstName + " " + values.lastName,  first_name: values.firstName, last_name: values.lastName },
  });
  
  // return error message if unsuccessful
  if (error) {
    console.error("Error updating user:", error.message);
    return { error: error.message };
  }

  return { success: "Changes Saved!" }; // return success message
};

export const updateUserAvatar = async (image: string ) => {
  const supabase = await createClient(); // get user through session

  const {error} = await supabase.auth.updateUser({ // update user with link to UploadCare server
    data: {avatar_url: image}
  })
  
  if (error) { // return error message if unsuccessful
    console.error("Error updating user:", error.message);
    return { error: error.message };
  }

  return { success: "Changes Saved!" }; // return success message
}

export const deleteImageUploadcare = async (imageId: string) => {

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({ // authentication info
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY ?? "",
      secretKey: process.env.UPLOADCARE_PRIVATE_KEY ?? "",
    });

    const result = await deleteFile( // run teh delete function
          {
            uuid: imageId,
          },
          { authSchema: uploadcareSimpleAuthSchema },
        );

    return result; // return
}

