"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

const LoginDialog = ({
  trigger,
  navbar,
}: {
  trigger: string;
  navbar?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const className = navbar
    ? "cursor-pointer text-foreground after:bg-foreground md:after:block md:after:h-[1px] md:after:origin-left md:after:scale-x-0 md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 transition-all will-change-transform"
    : "flex-1 text-sm rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <DialogContent className="grid p-0 md:grid-cols-2 h-fit max-h-[75vh] w-full max-w-[1000px]">
        <DialogTitle className="hidden" />
        <SignIn />
        <div className="hidden md:block w-full h-full overflow-hidden rounded-r-lg">
          <Image
            src="/email-cover.jpg"
            width={1980}
            height={1080}
            alt="Library photo"
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
