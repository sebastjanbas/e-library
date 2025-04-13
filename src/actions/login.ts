"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { LoginScema, RegisterScema } from "@/schemas";

export async function login(values: z.infer<typeof LoginScema>) {
  const validatedData = LoginScema.safeParse(values);
  if (!validatedData.success) return { error: "Invalid fields" };

  const supabase = await createClient();

  const data = {
    email: validatedData.data.email,
    password: validatedData.data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("ERROR: ", error.code);
    if (error.code === "invalid_credentials")
      return { error: "Invalid credentials" };
    if (error.code === "email_not_confirmed")
      return { error: "Email not confirmed" };
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  return { success: "Login successful!" };
}

// export async function OAuthSignIn(provider) {
//     const supabase = await createClient()
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: provider,
//         options: {
//             // redirectTo: "https://<YOURWEBSITE>/auth/callback",
//             // redirectTo: "http://localhost:3000/auth/callback",
//             redirectTo: "https://slovene-step-by-step.vercel.app/auth/callback",
//             queryParams: {
//                 access_type: 'offline',
//                 prompt: 'consent',
//               },
//         }
//     })
//
//     if (data.url) {
//         redirect(data.url) // use the redirect API for your server framework
//     }
// }

export async function signup(values: z.infer<typeof RegisterScema>) {
  const validateField = RegisterScema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid fields" };
  }

  if (validateField.data.password !== validateField.data.confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const supabase = await createClient();

  const userData = {
    email: validateField.data.email,
    password: validateField.data.password,
    options: {
      data: {
        full_name:
          validateField.data.firstName + " " + validateField.data.lastName,
        // avatar_url: "https://gravatar.com/avatar",
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(userData);

  if (data) {
    if (data.user?.identities?.length === 0) {
      return { error: "User already exists" };
    }
  }

  if (error) {
    console.log("ERROR: ", error);
    if (error.code === "email_address_invalid")
      return { error: "Invalid email address" };
    if (error.code === "user_already_exists")
      return { error: "User already exists" };
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  return { success: "Verification email send!" };
}

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: "Unable to log you out" };
  }
  return { success: "You are logged out!" };
};
