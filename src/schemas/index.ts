import { z } from "zod";

export const LoginScema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must containt at least 8 characters",
  }),
});

export const RegisterScema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must containt at least 8 characters",
  }),
});
