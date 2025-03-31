import { create } from "zustand";

interface AuthState {
  isEmailSent: boolean;   // To track if email was sent
  setEmailSent: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isEmailSent: false,     // Initial state
  setEmailSent: (status) => set({ isEmailSent: status }),
}));
