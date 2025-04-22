"use client";
import { login } from "@/actions/login";
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
import { LoginScema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof LoginScema>>({
    resolver: zodResolver(LoginScema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginScema>) => {
    setIsSubmitting(true);
    const response = await login(values);
    if (response.error) {
      form.resetField("password");
      toast.error(response.error);
    } else {
      toast.success(response.success);
    }
    setIsSubmitting(false);
    redirect("/")
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
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

            ): (
            <>
            Login
            </>
            )}
            </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
