import React, { Suspense } from "react";
import BookDashboardList from "../book/book-dashboard-list";
import BookListSkeleton from "../skeletons/book-list-skeleton";

const Dashboard = async () => {
  return (
    <div className="w-screen h-screen mt-20 flex flex-col justify-start items-center p-5 xl:p-10">
      <div className="flex flex-col gap-10 w-full">
        <Suspense fallback={<BookListSkeleton />}>
          <BookDashboardList />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
