import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";

type authcardProps = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: authcardProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-3 w-full overflow-hidden">
        <div className="flex flex-row items-center gap-1 w-full">
          <div className="h-[1px] w-full bg-foreground opacity-20"></div>
          <p className="text-sm w-full">Or continue with</p>
          <div className="h-[1px] w-full bg-foreground opacity-20"></div>
        </div>
        <div className="w-full flex flex-row flex-wrap items-center gap-2">
          <Button variant={"mine"} className="flex-1">
            <FaApple />
          </Button>
          <Button variant={"mine"} className="flex-1">
            <FaGoogle />
          </Button>
          <Button variant={"mine"} className="flex-1">
            <FaMeta />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
