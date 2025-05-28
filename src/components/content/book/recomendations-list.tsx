import React from "react";
import BookListSkeleton from "../skeletons/book-list-skeleton";

const RecomendationsList = async () => {
  return (
    <div className="w-full overflow-hidden">
      <div>RecomendationsList</div>
      <BookListSkeleton />
    </div>
  );
};

export default RecomendationsList;
