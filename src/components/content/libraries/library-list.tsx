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
    <ul className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
      {libraries.map((library, i) => (
        <li
          key={i}
          onClick={() => router.push(`/rooms/${library.id}`)}
          className="bg-background rounded-2xl p-4 flex flex-col sm:flex-row gap-y-2 justify-between cursor-pointer"
          style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
        >
          <div className="flex flex-row gap-3 items-start">
            <div
              className="w-[90px] h-[90px] rounded-2xl"
              style={{ background: colors[i % 3] }}
            ></div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-medium tracking-wide">
                {library.name}
              </h3>
              <h4 className="text-foreground/60 italic">007</h4>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <span className="cursor-pointer">
              <EllipsisVertical />
            </span>
            {i == 0 && (
              <span className="w-[40px] h-auto aspect-square rounded-full bg-blue-200">
                <Image src={"/test-user-photo.jpg"} alt="Profile photo" height={40} width={40} className="rounded-full" />
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LibraryList;
