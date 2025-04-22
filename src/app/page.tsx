import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/content/protected/dashboard";
import Navbar from "@/components/content/navbar";
import LandingPage from "@/components/content/landing-page";
import DashboardNavbar from "@/components/content/protected/dashboard-navbar";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return (
    <>
      {isLoggedIn ? (
        <>
          <DashboardNavbar />
          <Dashboard user={user} />
        </>
      ) : (
        <>
          <Navbar />
          <LandingPage />
          <p className="text-5xl w-full text-center mb-60 font-semibold">
            FOOTER
          </p>
        </>
      )}
    </>
  );
}
