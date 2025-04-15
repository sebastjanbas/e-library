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
  authors: z.array(z.string()),
  publisher: z.string(),
  publishedDate: z.string(),
  isbn10: z.string(),
  isbn13: z.string(),
  pageCount: z.number(),
  thumbnailUrl: z.string().url(),
  description: z.string(),
  categories: z.array(z.string()),
  language: z.string(),
  infoUrl: z.string().url(),
})

export type SupabaseBookSchema = {
    user_id: string, 
    title: string,
    subtitle: string,
    authors: string[],
    publisher: string,
    description: string,
    published_date: string,
    isbn_10: number,
    isbn_13: number,
    page_count: number,
    cover_url?: string,
    categories: string[],
    language: string,
    info_link: string,

}

