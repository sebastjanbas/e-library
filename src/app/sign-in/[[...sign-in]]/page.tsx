import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-screen p-0 m-0 h-screen overflow-hidden flex justify-center items-center">
      <div className="flex flex-1/2 justify-center items-center">
        <SignIn
          oauthFlow="popup"
          appearance={{
            elements: {
              cardBox: {
                boxShadow: "none",
                borderRadius: 35,
                width: "450px",
              },
              card: {
                boxShadow: "none",
                borderRadius: 0,
              },
              footer: {
                display: "none",
              },
            },
          }}
        />
      </div>
      <div className="hidden md:flex h-full flex-1/2">
        <Image
          className="object-cover"
          src={
            "https://placehold.co/1280x1920/EEE/31343C/png/?text=Placeholder&font=nato-sans"
          }
          alt="Placeholder image"
          width={1280}
          height={1920}
        />
      </div>
    </div>
  );
}
