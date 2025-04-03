import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AuthCard from "../auth/auth-card";
import SignupForm from "../auth/signup-form";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SignupDialog = ({
  trigger,
  navbar,
}: {
  trigger: string;
  navbar?: boolean;
}) => {
  const buttonClass =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

  let className =
    "cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0 md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 transition-all will-change-transform";

  if (!navbar) {
    className = cn(
      "flex-1 !rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3",
      buttonClass,
    );
  }

  return (
    <Dialog>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
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
  );
};

export default SignupDialog;
