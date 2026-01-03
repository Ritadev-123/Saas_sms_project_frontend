"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/env";

export type Role = "organisation" | "school" | null;

interface UserProfile {
    id: string;
    email: string;
    role: Role;
    // Add other profile fields as needed
}

interface AuthContextType {
    user: UserProfile | null;
    role: Role;
    isLoading: boolean;
    login: (tokens: { access_token: string, refresh_token: string }, role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [role, setRole] = useState<Role>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Hydrate from localStorage
        const storedRole = localStorage.getItem("role") as Role;
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            setRole(storedRole);
            // Ideally verify token or fetch profile here
        }
        setIsLoading(false);
    }, []);

    const login = (tokens: { access_token: string, refresh_token: string }, newRole: Role) => {
        // 1. Store Tokens
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);
        localStorage.setItem("role", newRole || "");

        // 2. Set Cookie (for middleware)
        document.cookie = `access_token=${tokens.access_token}; path=/; secure; samesite=strict`;
        document.cookie = `role=${newRole}; path=/; secure; samesite=strict`;

        // 3. Update State
        setRole(newRole);

        // 4. Redirect
        if (newRole === "organisation") {
            router.push("/dashboard");
        } else if (newRole === "school") {
            router.push("/admin/dashboard");
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");

        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        setUser(null);
        setRole(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, role, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
