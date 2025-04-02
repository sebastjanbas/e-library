import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/content/navbar";
import LandingPage from "@/components/content/landing-page";
import Dashboard from "@/components/content/protected/dashboard";

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
      <Dashboard user={user} />
    </>
  );
}
