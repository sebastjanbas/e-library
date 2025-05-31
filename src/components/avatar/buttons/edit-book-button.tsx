"use client";
import React, { useState } from "react";
import { HiOutlineCog } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { BookType } from "@/schemas";
import BookDetailsForm from "@/components/hooks/forms/book-details-form";
import { removeBook } from "@/actions/book-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const EditBookButton = ({ book }: { book: BookType }) => {
  const [open, setOpen] = useState(false);
  const handleRemove = async () => {
    const response = await removeBook(book?.id);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
    }
    redirect("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <HiOutlineCog className="text-white" size={24} strokeWidth={1.5} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            className="rounded-sm"
          >
            <DialogTrigger className="w-full cursor-pointer">
              <DropdownMenuItem className="w-full cursor-pointer rounded-xs text-xs">
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger className="w-full cursor-pointer">
              <DropdownMenuItem
                variant="destructive"
                className="w-full cursor-pointer rounded-xs text-xs"
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

          <div className="flex-1 w-full overflow-y-auto">
            <BookDetailsForm bookInfo={book} onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete:{" "}
              {book.title} by {book.authors?.join(", ")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-500"
              onClick={handleRemove}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default EditBookButton;
