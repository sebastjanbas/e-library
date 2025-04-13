import { z } from "zod";

export const LoginScema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must containt at least 8 characters",
  }),
});

export const RegisterScema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must containt at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must containt at least 8 characters",
  })
});

export const BookSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  authors: z.string().array(),
  publisher: z.string(),
  publishedDate: z.date(),
  isbn10: z.string(),
  isbn13: z.string(),
  pageCount: z.number(),
  thumbnailUrl: z.string().url(),
  description: z.string(),
  categories: z.string().array(),
  language: z.string(),
  infoUrl: z.string().url(),
})
