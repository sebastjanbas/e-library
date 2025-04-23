import ISBNForm from "@/components/hooks/forms/isbn-form";
import React from "react";

const ManualBookAddPage = () => {
  return (
    <div className="pt-20 flex flex-col justify-start items-center w-full h-full md:h-screen p-5">
      <h1 className="text-5xl font-semibold py-10 uppercase">Add Book Manually</h1>
      <div className="flex flex-col-reverse md:flex-row gap-5 w-full justify-center items-start">
        <ISBNForm />
      </div>
    </div>
  );
};

export default ManualBookAddPage;
