import { createClient } from "@/utils/supabase/server";
import Clock from "@/components/clock";
import LogoutButton from "@/components/auth/logout-button";
import Navbar from "@/components/content/navbar";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="w-screen h-screen flex flex-col justify-center items-center p-5 xl:p-10">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-slate-500 to-white leading-normal text-5xl md:text-6xl xl:text-7xl font-seba2">
            Digital library
          </h1>
        </div>
          <div className="h-screen w-screen">ANOTHRE PAGE</div>
      </>
    );
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center p-5 xl:p-10">
        {user && <p>Welcome {user.email}</p>}
        <LogoutButton />
        <Clock />
      </div>
    </>
  );
}
