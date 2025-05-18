"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

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
import { ProfileInfoSchema } from "@/schemas";
// import { updateUserInfo } from "@/actions/update-user";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const UserInfoForm = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileInfoSchema),
    defaultValues: {
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileInfoSchema>) => {
    setLoading(true);
    console.log(values);
    toast.warning("User setting changes are currently unavailable");
    // const response = await updateUserInfo(values);
    // if (response.error) {
    //   toast.error(response.error);
    //   return;
    // }

    // if (response.success) {
    //   toast.success(response.success);
    //   window.location.href = "/account/profile"; // reload the page for client components
    // }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        <div className="flex flex-row justify-between w-full gap-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder="Darius" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder="Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>
                Email can not be changed at the moment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {!loading ? (
            <span>Update</span>
          ) : (
            <>
              <LoaderCircle className="animate-spin" />
              <span>Saving Changes ...</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UserInfoForm;
