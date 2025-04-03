import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/content/protected/dashboard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Dashboard user={user} />
    </>
  );
}
