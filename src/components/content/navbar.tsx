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

const Navbar = () => {
  return (
    <div className="fixed px-10 flex flex-row justify-between items-center top-0 inset-0 h-20 w-full border-b border-[1px] bg-background">
      <div>LOGO</div>
      <div>NAV1</div>
      <div>NAV2</div>
      <div>NAV3</div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger className="bg-blue-500/50 hover:bg-blue-500/90 text-white transition-colors duration-200 ease-in-out rounded-xl px-4 py-2">
            Log in
          </DialogTrigger>
          <DialogContent className="grid p-0 md:grid-cols-2 h-fit w-[1000px]">
            <div className="flex flex-col justify-center items-center gap-6 p-6">
              <DialogHeader className="w-full">
                <DialogTitle className="w-full text-center capitalize">Welcome back!</DialogTitle>
                <DialogDescription className="w-full text-center">Login to your account</DialogDescription>
              </DialogHeader>
              <div className="w-full max-w-sm">
                <AuthCard>
                  <LoginForm />
                </AuthCard>
              </div>
            </div>
            <div className="bg-blue-500/50 w-full h-full"></div>
            <div className="absolute text-white bottom-0 left-1/2 translate-x-[-50%] text-center text-sm translate-y-10">
              <p>
                By clicking continue, you agree to our {" "}
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="hover:underline">
                  Privacy Policy.
                </a>
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="bg-blue-500/50 hover:bg-blue-500/90 text-white transition-colors duration-200 ease-in-out rounded-xl px-4 py-2">
            Sign up
          </DialogTrigger>
          <DialogContent className="grid p-0 md:grid-cols-2 h-fit w-[1000px]">
            <div className="flex flex-col justify-center items-center gap-6 p-6">
              <DialogHeader className="w-full">
                <DialogTitle className="capitalize text-center w-full">Welcome To Digital Library</DialogTitle>
                <DialogDescription className="w-full text-center">Create a new Account</DialogDescription>
              </DialogHeader>
              <div className="w-full max-w-sm">
                <AuthCard>
                  <SignupForm />
                </AuthCard>
              </div>
            </div>
            <div className="bg-blue-500/50 w-full h-full"></div>
            <div className="absolute text-white bottom-0 left-1/2 translate-x-[-50%] text-center text-sm translate-y-10">
              <p>
                By clicking continue, you agree to our {" "}
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="hover:underline">
                  Privacy Policy.
                </a>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
