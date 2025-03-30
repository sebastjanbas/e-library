import { createClient } from "@/utils/supabase/server";
import LoginForm from "../components/auth/login-form";
import Clock from "@/components/clock";

export default async function Home() {
  const supabase = await createClient()
  const {data: {user}, error} = await supabase.auth.getUser()
  
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center p-5 xl:p-10">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-slate-500 to-white leading-loose text-5xl md:text-6xl xl:text-7xl font-seba2">
          Electronic library
        </h1>
        <Clock />
        {user && <p>Welcome {user.email}</p>}
        {error && <p className="text-red-500">ERROR: {error.name}</p>}
        <LoginForm />
      </div>
    </>
  );
}
