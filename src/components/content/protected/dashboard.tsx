import { User } from "@supabase/supabase-js";
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Stats } from "./user/dashboard/stats";
import { BookList } from "./user/dashboard/book-list";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

type DashboardProps = {
  user: User | null;
};

const Dashboard = async ({ user }: DashboardProps) => {
  // TODO: Fix the book display
  const supabase = await createClient();
  const {
    data: allBooks,
    count,
    error,
  } = await supabase
    .from("books")
    .select("title, cover_url", { count: "exact" });

  if (error) {
    toast.error("Error loading books!");
  }

  const SampleBooks = [
    {
      title: "Great Gatsby",
      cover_url: "https://placehold.co/128x192?text=Image\nThumbnail",
    },
    {
      title: "Faster Than Lightning",
      cover_url: "https://placehold.co/128x192?text=Image\nThumbnail",
    },
    {
      title: "Grokking Algorithms",
      cover_url: "https://placehold.co/128x192?text=Image\nThumbnail",
    },
    {
      title: "Topolino",
      cover_url: "https://placehold.co/128x192?text=Image\nThumbnail",
    },
  ];

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
        <Stats stats={count ?? 500} author="Agatha Cristie" />
        {count !== 0 ? (
          <>
            <div>
              <p>ALL</p>
              <BookList list={allBooks} />
            </div>
            <div>
              <p>Favorites</p>
              <BookList list={SampleBooks} />
            </div>
            <div>
              <p>Criminals</p>
              <BookList list={SampleBooks} />
            </div>
            <div>
              <p>Romance</p>
              <BookList list={SampleBooks} />
            </div>
          </>
        ) : (
          <p>Add your first book to see statistics</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
