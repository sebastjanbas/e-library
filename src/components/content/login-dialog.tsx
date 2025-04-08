"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AuthCard from "../auth/auth-card";
import LoginForm from "../auth/login-form";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LoginDialog = ({trigger ,navbar }: { trigger: string, navbar?: boolean }) => {
    const pathname = usePathname();
  const [open, setOpen] = useState(false);
  let className =
    "cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0 md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 transition-all will-change-transform";

  if (!navbar) {
    className =
      "flex-1 text-sm rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
  }

  useEffect(() => {
    if (pathname !== "/") {
      setOpen(true)
    }

  }, [pathname])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} >{trigger}</DialogTrigger>
      <DialogContent className="grid p-0 md:grid-cols-2 h-fit max-h-[75vh] w-full max-w-[1000px]">
        <div className="flex flex-col justify-center items-center gap-6 p-6">
          <DialogHeader className="w-full">
            <DialogTitle className="w-full text-center capitalize">
              Welcome back!
            </DialogTitle>
            <DialogDescription className="w-full text-center">
              Login to your account
            </DialogDescription>
          </DialogHeader>
          <div className="w-full max-w-sm">
            <AuthCard>
              <LoginForm />
            </AuthCard>
          </div>
        </div>
        <div className="hidden md:block w-full h-full overflow-hidden rounded-r-lg">
          <Image
            src={"/email-cover.jpg"}
            width={1980}
            height={1080}
            alt="Libary photo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute text-white bottom-0 w-full text-center text-sm translate-y-12">
          <p>
            By clicking continue, you agree to our{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="hover:underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
