import create from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,

    setUser: (user) => set({ user }),
    setToken: (token) => set({ accessToken: token }),
    logout: () => set({ user: null, accessToken: null }),
}));