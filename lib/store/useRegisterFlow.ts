import { create } from "zustand";

interface RegisterFlowStore {
  step: "sign-up" | "verify";
  setStep: (step: "sign-up" | "verify") => void;
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const useRegisterFlow = create<RegisterFlowStore>((set) => ({
  step: "sign-up",
  setStep: (step) => set({ step }),
  email: "",
  setEmail: (email) => set({ email }),
  name: "",
  setName: (name) => set({ name }),
  password: "",
  setPassword: (password) => set({ password })
}));
