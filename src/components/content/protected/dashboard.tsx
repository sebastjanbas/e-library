import { User } from "@supabase/supabase-js";
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Stats } from "./user/dashboard/stats";
import { BookList } from "./user/dashboard/book-list";

type DashboardProps = {
  user: User | null;
};

const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center p-5 xl:p-10">
      {/* TODO: create the dashboard UI */}
      <div className="mt-20 flex flex-row justify-start items-center w-full gap-10">
        <p>
          Welcome{" "}
          <span className="font-semibold italic">
            {user?.user_metadata.full_name.split(" ")[0] ?? "ERROR"}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center my-10">
        <p>Scan a book to add it to the library</p>
        <Button asChild>
          <a href="/camera">
            <Camera />
          </a>
        </Button>
      </div>
      <div className="flex flex-col gap-10 w-full">
        <Stats />
        <div>
          <p>Favorites</p>
          <BookList />
        </div>
        <div>
          <p>Criminals</p>
          <BookList />
        </div>
        <div>
          <p>Romance</p>
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
