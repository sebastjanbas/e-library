"use client";
import { BookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, UseFieldArrayProps, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const BookDetailsForm = () => {
  const [expanded, setExpanded] = useState(false);
  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      authors: [""],
      publisher: "",
      publishedDate: new Date().toISOString().split("T")[0],
      isbn10: "",
      isbn13: "",
      pageCount: 0,
      thumbnailUrl: "",
      description: "",
      categories: [""],
      language: "",
      infoUrl: "",
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

  const onSubmit = (values: z.infer<typeof BookSchema>) => {
    console.log("VALUES: ", values);
  };

  return (
    <div
      className={`overflow-hidden w-full transition-all duration-1000 ease-in-out p-5 ${
        expanded ? "max-h-[3000px] max-w-[1000px]" : "max-h-28 w-full md:max-w-52"
      }`}
    >
      <Button onClick={() => setExpanded(!expanded)} variant={"link"} className={`w-full ${expanded ? "h-fit mb-5 justify-end translate-y-0" :"h-full mb-20 justify-center translate-y-5"} flex items-center`}>show form</Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full md:w-[400px] lg:w-[600px] xl:w-[800px]"
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
                    <FormDescription>Write the book title here</FormDescription>
                    <FormControl>
                      <Input placeholder="The Great Gatsby" {...field} />
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
                      <Input placeholder="Optional subtitle" {...field} />
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
                      <Input placeholder="Publisher" {...field} />
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
                      <Input type="date" {...field} />
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
                      <Textarea placeholder="Book description..." {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input type="number" min={1} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                      <Input placeholder="https://..." {...field} />
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
                        <FormControl>
                          <Input
                            placeholder={`Category ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
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
                      <Input placeholder="e.g. en" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="infoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Info URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookDetailsForm;
