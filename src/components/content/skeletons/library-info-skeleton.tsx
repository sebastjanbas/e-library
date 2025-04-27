import React from "react";

const LibraryInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <div className="h-10 w-1/3 bg-muted animate-pulse rounded" />
        <div className="h-5 w-1/4 bg-muted animate-pulse rounded" />
      </div>

      {/* Search */}
      <div className="h-8 w-1/2 bg-muted animate-pulse rounded" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-4">
                  <div className="h-4 w-6 bg-muted animate-pulse rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-4 w-8 bg-muted animate-pulse rounded ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryInfoSkeleton;
