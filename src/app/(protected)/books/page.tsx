import BookList from "@/components/content/book/book-list";
import { LoaderCircle } from "lucide-react";
import React, { Suspense } from "react";

const BooksPage = () => {
  return (
    <div className="mt-14 p-10">
      <div>
        <h1 className="font-semibold text-5xl pb-5 md:pb-0">Book List</h1>
        <div>
          <Suspense
            fallback={
              <div className="flex w-full h-full justify-center items-center">
                <LoaderCircle className="animate-spin text-xl" />
              </div>
            }
          >
            <BookList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BooksPage
