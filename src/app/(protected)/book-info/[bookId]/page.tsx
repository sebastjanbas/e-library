/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Suspense } from "react";
import { BookServerDetails } from "@/components/content/book/book-server-details";
import { BookDetailsSkeleton } from "@/components/content/book/book-details-skeleton";
import RecomendationsList from "@/components/content/book/recomendations-list";

const BookDetailsPage = ({ params }: any) => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-24 p-5">
      <Suspense fallback={<BookDetailsSkeleton />}>
        <BookServerDetails bookId={params.bookId} />
      </Suspense>
      <RecomendationsList />
    </div>
  );
};

export default BookDetailsPage;
