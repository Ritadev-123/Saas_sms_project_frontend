import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: "dark", // Default to dark theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;

            if (typeof window !== 'undefined') {
                localStorage.setItem("theme", action.payload);
                document.body.setAttribute("data-theme", action.payload);
            }
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            state.theme = newTheme;

            if (typeof window !== 'undefined') {
                localStorage.setItem("theme", newTheme);
                document.body.setAttribute("data-theme", newTheme);
            }
        },
        hydrateTheme: (state) => {
            if (typeof window !== 'undefined') {
                const savedTheme = localStorage.getItem("theme") as Theme;
                if (savedTheme) {
                    state.theme = savedTheme;
                    document.body.setAttribute("data-theme", savedTheme);
                } else {
                    document.body.setAttribute("data-theme", "dark");
                }
            }
        },
    },
});

export const { setTheme, toggleTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
