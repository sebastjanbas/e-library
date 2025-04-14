import { User } from "@supabase/supabase-js";
import React from "react";
import { Button } from "@/components/ui/button";
// import { Camera } from "lucide-react";
import { Stats } from "./user/dashboard/stats";
import { BookList } from "./user/dashboard/book-list";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type DashboardProps = {
  user: User | null;
};

const Dashboard = async ({ user }: DashboardProps) => {
  const supabase = await createClient();
  const {
    data: allBooks,
    count,
    error,
  } = await supabase
    .from("books")
    .select("*", { count: "exact" });

  if (error) {
    toast.error("Error loading books!");
  }

  // const SampleBooks = [
  //   { title: "Great Gatsby" },
  //   { title: "Faster Than Lightning" },
  //   { title: "Grokking Algorithms" },
  //   { title: "Topolino" },
  //   {
  //     title:
  //       "Designing Data-Intensive Applications The Big Ideas Behind Reliable, Scalable, And Maintainable Systems",
  //   },
  // ];

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
        <Dialog>
          <DialogTrigger className="bg-foreground text-background px-4 py-2 rounded-full">
            Add a book
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="w-full flex justify-center items-center">
              <DialogTitle className="text-center">Add a book</DialogTitle>
              <DialogDescription className="text-center max-w-2xl">
                Description Eleifend et, justo vel sit faucibus faucibus
                ullamcorper elit magna. Urna faucibus, velit sed vestibulum
                consectetur suscipit ante aenean, nulla.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row justify-center items-center gap-5 w-full max-w-lg justify-self-center">
              <Button className="flex-1 rounded-full">Manual Add</Button>
              <Button asChild className="flex-1 rounded-full">
                <Link href={"/camera"}>Scan Add</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
              <BookList list={allBooks} />
            </div>
            <div>
              <p>Criminals</p>
              <BookList list={allBooks} />
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
