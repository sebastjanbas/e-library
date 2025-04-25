"use client";
import { BookSchema, BookType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, UseFieldArrayProps, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { updateBookInfo } from "@/actions/book-actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryInput } from "./form-components/category-input";

const BookDetailsForm = ({
  bookInfo,
  onSuccess,
}: {
  bookInfo?: BookType;
  onSuccess?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: bookInfo?.title ?? "",
      subtitle: bookInfo?.subtitle ?? "",
      authors: bookInfo?.authors ?? [""],
      publisher: bookInfo?.publisher ?? "",
      publishedDate:
        bookInfo?.published_date ?? new Date().toISOString().split("T")[0],
      isbn10: bookInfo?.isbn_10 ?? "",
      isbn13: bookInfo?.isbn_13 ?? "",
      pageCount: bookInfo?.page_count ?? 0,
      thumbnailUrl: bookInfo?.cover_url ?? "",
      description: bookInfo?.description ?? "",
      categories: bookInfo?.categories ?? [""],
      language: bookInfo?.language ?? "",
      infoUrl: bookInfo?.info_link ?? "",
    },
  });

  type BookFormData = z.infer<typeof BookSchema>;

  // Authors
  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control: form.control,
    name: "authors" as UseFieldArrayProps<BookFormData>["name"],
  });

  // Categories
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories" as UseFieldArrayProps<BookFormData>["name"],
  });

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    setIsLoading(true);

    if (!bookInfo?.id) {
      toast.error("Something went wrong!");
      return;
    }

    const response = await updateBookInfo(values, bookInfo?.id);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
      if (onSuccess) {
        onSuccess();
      }
    }
    setIsLoading(false);
    router.refresh();
  };
  // md:w-[400px] lg:w-[600px] xl:w-[800px]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full h-full flex flex-col justify-between"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="The Great Gatsby"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Optional subtitle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Authors</FormLabel>
              {authorFields.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`authors.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={`Author ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeAuthor(index)}
                      >
                        ✕
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAuthor("")}
              >
                + Add Author
              </Button>
            </div>
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Publisher"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-24"
                      disabled={isLoading}
                      placeholder="Book description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isbn10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN-10</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn13"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN-13</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Count</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Categories</FormLabel>
              {categoryFields.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`categories.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <CategoryInput
                        field={field}
                        placeholder={`Category ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeCategory(index)}
                      >
                        ✕
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendCategory("")}
              >
                + Add Category
              </Button>
            </div>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. en"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-full"
        >
          {isLoading ? (
            <>
              <LoaderCircle />
              Updating book inforamtion
            </>
          ) : (
            <span>Update Book</span>
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BookDetailsForm;
