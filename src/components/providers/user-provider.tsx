"use client";

import { useEffect } from "react";
import { useUser } from "@/store/useUser";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useUser((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}
