"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { LibraryType } from "@/schemas";
import { createLibrary } from "@/actions/book-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LibraryForm = ({onSuccess}: {onSuccess: () => void}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LibraryType),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LibraryType>) => {
    setIsLoading(true);

    const response = await createLibrary(values);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
      onSuccess();
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Library name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Living Room"
                  {...field}
                />
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
                  disabled={isLoading}
                  placeholder="Write a short desctiption ... "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span>Creating Library ...</span>
            </>
          ) : (
            <span>Create new Library</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LibraryForm;
