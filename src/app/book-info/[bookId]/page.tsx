import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Building, CalendarDays, InfoIcon, Ruler } from "lucide-react";
import { IoIosGlobe } from "react-icons/io";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsStarFill } from "react-icons/bs";
import { formatDate, languageMap } from "@/lib/docs";
import EditBookButton from "@/components/avatar/buttons/edit-book-button";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
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
    // FIX: add the book edit functionality
    <div className="flex justify-center items-center mt-24 p-5">
      {data && (
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            <div className="md:basis-1/3 flex justify-center items-start">
              <div className="h-full w-fit">
                <Image
                  width={400}
                  height={600}
                  src={
                    data[0].cover_url ??
                    "https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
                  }
                  alt={data[0].title}
                  className="w-auto h-96 object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="md:basis-2/3 h-fit md:h-screen max-h-96 flex flex-col justify-between items-start">
              <div className="w-full">
                <p className="w-full text-center md:text-start text-2xl md:text-3xl font-semibold pb-1">{data[0].title}</p>
                <p className="w-full text-center md:text-start text-lg md:text-xl font-semibold pb-2">
                  {data[0].subtitle ?? "Unknown"}
                </p>
                <p className="pb-5 w-full text-center md:text-start">
                  {data[0].authors?.join(", ") ?? "Unknown"}
                </p>
                <p className="text-sm pb-10 italic w-full text-center md:text-start">
                  {data[0].categories?.join(", ") ?? "Unknown"}
                </p>
              </div>

              <div className="relative rounded-2xl px-4 py-3 bg-[#848A95] w-full md:w-fit">
                <div className="absolute top-3 right-4 cursor-pointer">
                  <EditBookButton book={data[0]} />
                </div>
                  <Dialog>
                    <h1 className="inline-flex text-white items-center gap-3 text-lg md:text-xl font-semibold">
                      Book
                      <DialogTrigger className="cursor-pointer">
                        <InfoIcon className="size-[18px] md:size-[20px]" />
                      </DialogTrigger>
                    </h1>
                    <DialogContent className="max-w-xl">
                      <DialogHeader className="flex flex-row w-full items-start justify-start h-14">
                        <Image
                          width={400}
                          height={600}
                          src={
                            data[0].cover_url ??
                            "https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
                          }
                          alt={data[0].title}
                          className="w-auto h-full object-contain rounded-xs"
                        />

                        <div className="flex flex-col">
                          <DialogTitle className="text-[1.3rem]">
                            Edition Details
                          </DialogTitle>
                          <p className="leading-3">Book</p>
                        </div>
                      </DialogHeader>
                      <div className="w-full h-[1px] bg-foreground/10"></div>
                      <div className="text-sm">
                        <h1 className="text-md font-semibold">
                          Publisher Description
                        </h1>
                        <p>{data[0].description?.slice(0, 150) ?? "Unknown"}</p>
                        <div className="my-5 w-full h-[1px] bg-foreground/10"></div>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-5">
                        <div className="flex flex-row items-center gap-3">
                          <span className="text-lg font-semibold tracking-tighter w-8">4.7</span>
                          <div className="flex flex-col gap-0">
                            <h2 className="text-sm text-gray-600">Book Rating</h2>
                            <span className="inline-flex gap-1">
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarFill />
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <CalendarDays className="w-8" />
                          <div className="flex flex-col gap-0">
                            <h2 className="text-sm text-gray-600">Released</h2>
                            <p className="font-semibold leading-4">{formatDate(data[0].published_date)}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <IoIosGlobe size={27} className="w-8" />
                          <div className="flex flex-col gap-0">
                            <h2 className="text-sm text-gray-600">Language</h2>
                            <p className="font-semibold leading-4">{languageMap[data[0].language] ?? data[0].language }</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <Ruler className="rotate-[-45deg] w-8" />
                          <div className="flex flex-col gap-0">
                            <h2 className="text-sm text-gray-600">Length</h2>
                            <p className="font-semibold leading-4">{data[0].page_count ?? 0}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <Building className="w-8" />
                          <div className="flex flex-col gap-0">
                            <h2 className="text-sm text-gray-600">Publisher</h2>
                            <p className="font-semibold leading-4">{data[0].publisher ?? "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                <p className="text-sm pb-4 text-white">
                  {data[0].page_count ?? 0} Pages
                </p>

                <div className="flex flex-row gap-3">
                  <Button
                    size={"lg"}
                    className="flex-1/2 bg-[#9DA2AE] hover:bg-[#8C919B] hover:text-[#C4C8D1] text-md font-semibold transition-colors duration-300 ease-in-out cursor-pointer rounded-lg"
                  >
                    Start Reading
                  </Button>
                  <Button
                    size={"lg"}
                    asChild
                    className="flex-1/2 bg-white hover:bg-[#B3B5BC] hover:text-[#73757B] text-foreground text-md font-normal transition-colors duration-300 ease-in-out cursor-pointer rounded-lg"
                  >
                    <a
                      href={`https://www.google.com/search?q=${data[0].title.replaceAll(" ", "+")}&oq=${data[0].title.replaceAll(" ", "+")}`}
                      target="_blank"
                    >
                      Find Online
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-20 w-full max-w-5xl justify-self-center pb-20">
            <h1 className="text-xl font-semibold pb-2">About the book:</h1>
            <p className="italic leading-relaxed tracking-normal text-justify">{data[0].description ?? "Not Specified"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
