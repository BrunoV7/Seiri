import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "@/lib/api";
import { toast } from "sonner";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
};

type UserState = {
  user?: User;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
  refetch: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: undefined,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: undefined }),

    fetchUser: async () => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.get("/api/sc/user/v1/info");
        const loadedUser: User = response.data;

        set({ user: loadedUser, isLoading: false });
      } catch (error) {
        set({ error: "Erro ao carregar usuário", isLoading: false });
        toast.error("Não foi possível carregar o seu perfil.");
      }
    },
    refetch: async () => {     
        await get().fetchUser();
    },
  }))
);
