import { theme } from 'tailwindcss/stubs/defaultConfig.stub';
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("vidchat-theme") || "synthwave",
    setTheme: (theme) => {
        localStorage.setItem("vidchat-theme", theme);
        set({ theme });
    },
}));