import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Role = "organisation" | "school" | null;

interface UserProfile {
    id: string;
    email: string;
    role: Role;
}

interface AuthState {
    user: UserProfile | null;
    role: Role;
    isLoading: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: null,
    role: null,
    isLoading: true,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; role: Role }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            state.isLoading = false;

            // Store in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', action.payload.accessToken);
                localStorage.setItem('refresh_token', action.payload.refreshToken);
                localStorage.setItem('role', action.payload.role || '');

                // Store in cookies
                document.cookie = `access_token=${action.payload.accessToken}; path=/; secure; samesite=strict`;
                document.cookie = `role=${action.payload.role}; path=/; secure; samesite=strict`;
            }
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
            state.accessToken = null;
            state.refreshToken = null;

            // Clear storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('role');

                document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            }
        },
        hydrateAuth: (state) => {
            if (typeof window !== 'undefined') {
                const storedRole = localStorage.getItem("role") as Role;
                const accessToken = localStorage.getItem("access_token");
                const refreshToken = localStorage.getItem("refresh_token");

                if (accessToken) {
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;
                    state.role = storedRole;
                }
            }
            state.isLoading = false;
        },
    },
});

export const { setAuth, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
