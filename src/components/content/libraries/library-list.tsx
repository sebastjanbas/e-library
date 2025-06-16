"use client";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type LibraryProp = {
  id: string;
  name: string;
};

const LibraryList = ({ libraries }: { libraries: LibraryProp[] }) => {
  const colors = ["#9cbfbc", "#ffb774", "#ffa2a2"];
  // const [shared, setShared] = useState<boolean>(true);
  const router = useRouter();
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      {libraries.map((library, i) => (
        <li
          key={i}
          onClick={() => router.push(`/rooms/${library.id}`)}
          className="relative bg-background overflow-hidden rounded-4xl h-[200px] w-full md:max-w-[400px] flex flex-col cursor-pointer"
          style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
        >
          <span className="absolute top-5 right-3 cursor-pointer">
            <EllipsisVertical className="text-background" />
          </span>
          <div
            className="w-full h-[140px]"
            style={{ background: colors[i % 3] }}
          ></div>
          <div className="px-5 py-2 flex flex-row w-full justify-between gap-3 items-start">
            <h3 className="text-2xl font-medium tracking-wide">
              {library.name}
            </h3>
            <div className="flex flex-row gap-3 items-center justify-end">
              {i == 0 && (
                <span className="w-[32px] h-auto aspect-square rounded-full bg-blue-200">
                  <Image
                    src={"/test-user-photo.jpg"}
                    alt="Profile photo"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                </span>
              )}
              <h4 className="text-foreground/60 italic">007</h4>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LibraryList;
