"use client";
import { deleteLibray } from "@/actions/book-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type LibraryProp = {
  id: string;
  name: string;
};

const LibraryList = ({ libraries }: { libraries: LibraryProp[] }) => {
  const colors = ["#9cbfbc", "#ffb774", "#ffa2a2"];
  const numbers = [14, 24, 9, 412, 3, 42, 0];
  // const [shared, setShared] = useState<boolean>(true);
  const router = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      {libraries.map((library, i) => (
        <li
          key={i}
          className="relative bg-background overflow-hidden rounded-4xl h-[200px] w-full md:max-w-[400px] flex flex-col cursor-pointer"
          style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
        >
          <span className="absolute top-5 right-3 cursor-pointer">
            <LibraryMenu libraryId={library.id} success={() => router.refresh()} />
          </span>
          <div
            className="w-full h-[140px]"
            style={{ background: colors[i % 3] }}
            onClick={() => router.push(`/rooms/${library.id}`)}
          ></div>
          <div
            onClick={() => router.push(`/rooms/${library.id}`)}
            className="px-5 py-2 flex flex-row w-full justify-between gap-3 items-start"
          >
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
              <h4 className="text-foreground/60 italic">
                {String(numbers[i % 7]).padStart(3, "0")}
              </h4>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LibraryList;

const LibraryMenu = ({ libraryId, success }: { libraryId: string, success: () => void }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteLibray(libraryId);
    if (response?.error){
      toast.error(response.error)
    } else{
      toast.success(response.success)
      success()
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <EllipsisVertical className="text-background" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            className="rounded-sm"
          >
            <DialogTrigger className="w-full cursor-pointer">
              <DropdownMenuItem className="w-full cursor-pointer rounded-xs text-sm">
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger className="w-full cursor-pointer">
              <DropdownMenuItem
                variant="destructive"
                className="w-full cursor-pointer rounded-xs text-sm"
              >
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="flex flex-col md:px-10 py-8 w-full max-w-5xl h-full md:h-fit md:max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Edit book information</DialogDescription>
          </DialogHeader>

          <div className="flex-1 w-full overflow-y-auto">LIBRARY EDIT FORM</div>
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete: The
              libray and the books inside the library
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-500"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};
