"use client"
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import { useAuthStore } from "../hooks/signup-conf";

type authcardProps = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: authcardProps) => {
  const { isEmailSent } = useAuthStore();
  return (
    <Card className="border-none shadow-none">
      <CardContent>{children}</CardContent>
      {!isEmailSent && (
        <CardFooter className="flex flex-col gap-3 w-full overflow-hidden">
          <div className="flex flex-row items-center gap-1 w-full">
            <div className="h-[1px] w-full bg-foreground opacity-20"></div>
            <p className="text-sm w-full">Or continue with</p>
            <div className="h-[1px] w-full bg-foreground opacity-20"></div>
          </div>
          <div className="w-full flex flex-row flex-wrap items-center gap-2">
            <Button disabled variant={"mine"} className="relative flex-1">
              <p className="absolute text-black/50 rotate-[-12deg]">COMING SOON</p>
              <FaApple />
            </Button>
            <Button disabled variant={"mine"} className="relative flex-1">
              <p className="absolute text-black/50 rotate-[-12deg]">COMING SOON</p>
              <FaGoogle />
            </Button>
            <Button disabled variant={"mine"} className="relative flex-1">
              <p className="absolute text-black/50 rotate-[-12deg]">COMING SOON</p>
              <FaMeta />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
