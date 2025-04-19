"use server"
import { ProfileInfoSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

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

