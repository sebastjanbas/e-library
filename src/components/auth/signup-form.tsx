"use client";
import { signup } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BsCheckCircle } from "react-icons/bs"
import { Input } from "@/components/ui/input";
import { RegisterScema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "../hooks/signup-conf";

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isEmailSent } = useAuthStore();
  const form = useForm<z.infer<typeof RegisterScema>>({
    resolver: zodResolver(RegisterScema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterScema>) => {
    setIsSubmitting(true);
    const response = await signup(values);
    if (response.error) {
      form.resetField("password");
      form.resetField("confirmPassword");
      toast.error(response.error);
      setIsSubmitting(false);
      return;
    }

    if (response.success) {
      toast.success(response.success);
      useAuthStore.getState().setEmailSent(true);
    }
    setIsSubmitting(false);
  };

  if (isEmailSent) {
    return (
      <div className="bg-emerald-500/15 w-full p-3 rounded-[6px] inline-flex items-center gap-x-2 text-sm text-emerald-500">
        <BsCheckCircle className="h-4 w-4" />
        Confirmation sent
      </div>
    );
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row items-center justify-between gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Last name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="m@example.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            variant={"mine"}
            className="w-full"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" /> Signing you in ...
              </>
            ) : (
              <>Sign up</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
