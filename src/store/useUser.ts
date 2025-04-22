import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

export const useUser = create<UserStore>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    const supabase = createClient();
    const { data: {user} } = await supabase.auth.getUser();
    set({ user: user, loading: false });
  },
}));
