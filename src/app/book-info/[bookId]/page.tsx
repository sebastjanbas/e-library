import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const BookDetailsPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const { bookId } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId);

  if (error) {
    toast.error("ERROR FETCHING BOOK: " + error.message);
  }
  
  return (
    <div className="mt-24 p-5">
      {data && (
        <>
          <p className="text-5xl font-semibold pb-10">{data[0].title}</p>
          <div className="flex flex-row gap-10">
            <div className="flex-1/3 flex justify-center items-start">
              <div className="w-full h-full">
                <a
                  href={`https://www.google.com/search?q=${data[0].title.replaceAll(" ", "+")}&oq=${data[0].title.replaceAll(" ", "+")}`}
                  target="_blank"
                >
                  <Image
                    width={128}
                    height={192}
                    src={
                      data[0].cover_url ??
                      "https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
                    }
                    alt={data[0].title}
                    className="w-full max-h-96 object-contain"
                  />
                </a>
              </div>
            </div>
            <div className="flex-2/3">
              <p>Subtitle: {data[0].subtitle ?? "Unknown"}</p>
              <p>Authors: {data[0].authors?.join(", ") ?? "Unknown"}</p>
              <p>Publisher: {data[0].publisher}</p>
              <p>Published date: {data[0].published_date}</p>
              <p>Page count: {data[0].page_count}</p>
              <p>Description: {data[0].description}</p>
              <p>Categories: {data[0].categories?.join(", ") ?? "Unknown"}</p>
              <p>Language: {data[0].language}</p>
              <a
                className="italic underline"
                target="_blank"
                href={data[0].info_link}
              >
                Info link
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetailsPage;
