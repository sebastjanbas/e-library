import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "../auth/login-form";
import AuthCard from "../auth/auth-card";
import SignupForm from "../auth/signup-form";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed z-50 overflow-hidden pr-5 md:px-10 flex justify-center items-center top-0 inset-0 h-20 w-full border-b border-[1px] bg-background/90">
      <div className="w-full max-w-6xl flex flex-row justify-between items-center">
        <div className="w-44 p-0 m-0 h-auto">
          <Image
            src={"/logo.png"}
            width={512}
            height={512}
            alt="Company Logo"
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger
              className="cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0
  md:after:transition-transform md:after:duration-300 
  md:hover:after:scale-x-100 transition-all will-change-transform"
            >
              Log in
            </DialogTrigger>
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
          <div className="h-[30px] w-[1px] bg-foreground/30"></div>
          <Dialog>
            <DialogTrigger
              className="cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0
  md:after:transition-transform md:after:duration-300 
  md:hover:after:scale-x-100 transition-all will-change-transform"
            >
              Sign up
            </DialogTrigger>
            <DialogContent className="grid p-0 md:grid-cols-2 h-full max-h-[75vh] w-full max-w-[1000px]">
              <div className="flex flex-col justify-center items-center gap-6 p-6">
                <DialogHeader className="w-full">
                  <DialogTitle className="capitalize text-center w-full">
                    Welcome To <strong className="text-[#D28E57]">Bookvoult</strong> 
                  </DialogTitle>
                  <DialogDescription className="w-full text-center">
                    Create a new Account
                  </DialogDescription>
                </DialogHeader>
                <div className="w-full max-w-sm">
                  <AuthCard>
                    <SignupForm />
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
