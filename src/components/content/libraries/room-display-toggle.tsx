"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const RoomListToggle = ({ data }: {data: {id: string, name: string}[] | null}) => {
  const [list, setList] = useState(false);
  const router = useRouter();

  if (!data) {
    return <p className="italic text-red-500">No libraries</p>;
  }

  return (
    <>
      <Button className="mb-10" onClick={() => setList(!list)}>Toggle view</Button>
      {list ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 space-y-5">
          {data.map((room: {id: string, name: string}) => (
            <Link href={`/rooms/${room.id}`} key={room.id}>
              <li className="w-full h-32 bg-blue-200 rounded-xl flex justify-center items-center">
                <span className="text-white text-4xl font-number font-bold">
                  {room.name}
                </span>
              </li>{" "}
            </Link>
          ))}{" "}
        </ul>
      ) : (
        <Table>
          <TableCaption>Caption</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((room: {id: string, name: string}, i: number) => (
              <TableRow
                key={i}
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => router.push(`/rooms/${room.id}`)}
              >
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{room.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default RoomListToggle;
