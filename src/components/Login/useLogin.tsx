import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  accessToken?: string;
  refreshToken?: string;
  imageUrl?: string | null;
  setToken: (accessToken?: string, refreshToken?: string) => void;
  setImageUrl: (imageUrl: string | null) => void;
  clear: () => void;
  login: () => boolean;
}

const useLogin = create<LoginState>()(
  persist(
    (set, get) => ({
      accessToken: undefined,
      refreshToken: undefined,
      imageUrl: null,
      setToken: (accessToken = undefined, refreshToken = undefined) => {
        set((prev) => ({
          ...prev,
          accessToken: accessToken ?? get().accessToken,
          refreshToken: refreshToken ?? get().refreshToken,
        }));
      },
      setImageUrl: (imageUrl) => {
        set((prev) => ({
          ...prev,
          imageUrl,
        }));
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
