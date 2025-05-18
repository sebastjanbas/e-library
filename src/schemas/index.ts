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
  }),
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
});

export type BookType = {
  id: string,
  user_id: string;
  title: string;
  subtitle: string | null;
  authors: string[] | null;
  publisher: string | null;
  description: string | null;
  published_date: string | null;
  isbn_10: string | null;
  isbn_13: string | null;
  page_count: number | null;
  cover_url?: string | null;
  categories: string[] | null;
  language: string | null;
  info_link?: string | null;
};

export const ProfileInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});


export const LibraryType = z.object({
    name: z.string(),
    description: z.string(),
  });

