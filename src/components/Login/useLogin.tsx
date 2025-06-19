import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  accessToken?: string;
  refreshToken?: string;
  setToken: (accessToken?: string, refreshToken?: string) => void;
  clear: () => void;
  login: () => boolean;
}

const useLogin = create<LoginState>()(
  persist(
    (set, get) => ({
      accessToken: undefined,
      refreshToken: undefined,
      setToken: (accessToken = undefined, refreshToken = undefined) => {
        set({
          accessToken: accessToken ?? get().accessToken,
          refreshToken: refreshToken ?? get().refreshToken,
        });
      },
      clear: () => set({ accessToken: undefined, refreshToken: undefined }),
      login: () => get().accessToken !== undefined && get().refreshToken !== undefined,
    }),
    {
      name: "user-token",
    }
  )
);

export default useLogin;
