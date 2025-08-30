import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("vidchat-theme") || "aqua",
    setTheme: (theme) => {
        localStorage.setItem("vidchat-theme", theme);
        set({ theme });
    },
}));