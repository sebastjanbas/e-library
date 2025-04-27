/* eslint-disable @typescript-eslint/no-explicit-any */
import LibraryInfo from "@/components/content/libraries/library-info";
import LibraryInfoSkeleton from "@/components/content/skeletons/library-info-skeleton";
import React, { Suspense } from "react";

const LibPage = ({ params }: any) => {


  return (
    <div className="mt-20 p-5">
      <Suspense fallback={<LibraryInfoSkeleton />}>
      <LibraryInfo libId={params.libId} />
      </Suspense>
    </div>
  );
};

export default LibPage;
