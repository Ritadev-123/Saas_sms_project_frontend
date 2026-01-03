"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import { logout } from "@/store/slices/authSlice";

export function Header() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state: RootState) => state.theme.theme);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <header className="fixed top-0 right-0 z-30 ml-64 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-glass-border bg-glass-bg backdrop-blur-xl px-6">
            <div className="flex items-center gap-4">
                {/* Breadcrumb or Title placeholder */}
                <span className="text-sm text-muted">Welcome back, Admin</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="rounded-full p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"
                    title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="h-9 px-4 text-sm border-glass-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                >
                    Log Out
                </Button>
            </div>
        </header>
    );
}
