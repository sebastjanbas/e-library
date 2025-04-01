import { createClient } from "@/utils/supabase/server";
import Clock from "@/components/clock";
import LogoutButton from "@/components/auth/logout-button";
import Navbar from "@/components/content/navbar";
import LandingPage from "@/components/content/landing-page";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <Navbar />
        <LandingPage />
        <p className="text-5xl w-full text-center mb-60 font-semibold">FOOTER</p>
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
