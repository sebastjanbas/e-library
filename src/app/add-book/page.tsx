import BookDetailsForm from "@/components/hooks/forms/book-details-form";
import ISBNForm from "@/components/hooks/forms/isbn-form";
import React from "react";

const ManualBookAddPage = () => {
  return (
    <div className="pt-20 flex flex-col justify-center items-center w-full h-full md:h-screen p-5">
      <h1 className="text-5xl font-semibold py-10 uppercase">Add Book Manually</h1>
      <div className="flex flex-col-reverse md:flex-row gap-5 w-full justify-center items-start">
        <div className="border-black border-[1px] p-5 h-full w-full md:w-fit">
          <BookDetailsForm />
        </div>
        <div className="border-black h-fit w-full md:w-fit border-[1px] p-5 space-y-3">
          <ISBNForm />
        </div>
      </div>
    </div>
  );
};

export default ManualBookAddPage;
