import LogoutButton from "@/components/auth/logout-button";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

type DashboardProps = {
  user: User | null;
};

const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-5 xl:p-10">
      {user && <p>Welcome {user.user_metadata.full_name}</p>}
      <LogoutButton />
      <Button asChild>
        <a href="/camera">
          <Camera />
        </a>
      </Button>
    </div>
  );
};

export default Dashboard;
