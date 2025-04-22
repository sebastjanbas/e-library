import { User } from "@supabase/supabase-js";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import BookDashboardList from "../book/book-dashboard-list";
import BookListSkeleton from "../skeletons/book-list-skeleton";

export type UserType = {
  user: User | null;
};

const Dashboard = async () => {
  return (
    <div className="w-screen h-screen mt-20 flex flex-col justify-start items-center p-5 xl:p-10">
      <div className="flex flex-col gap-5 justify-center items-center my-10">
        <p>Scan a book to add it to the library</p>
        <Dialog>
          <DialogTrigger className="bg-foreground cursor-pointer text-background px-4 py-2 rounded-full">
            Add a book
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="w-full flex justify-center items-center">
              <DialogTitle className="text-center">Add a new book</DialogTitle>
              <DialogDescription className="text-center max-w-2xl">
                Choose how you’d like to add your book to the library.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row justify-center items-center gap-5 w-full max-w-lg justify-self-center">
              <Button className="flex-1 cursor-pointer rounded-full" asChild>
                <Link href={"/add-book"}>Enter Details Manually</Link>
              </Button>
              <Button asChild className="flex-1 rounded-full">
                <Link href={"/camera"}>Scan Book ISBN</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-10 w-full">
        <Suspense fallback={<BookListSkeleton />} >
          <BookDashboardList />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
