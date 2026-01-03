"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { useAppSelector } from "@/store/hooks";

export default function AdminDashboardPage() {
    const router = useRouter();
    const { role, accessToken, isLoading } = useAppSelector(state => state.auth);

    React.useEffect(() => {
        if (!isLoading && accessToken && role === 'organisation') {
            router.push('/dashboard');
        }
    }, [role, accessToken, isLoading, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
    }

    // Show login form if not authenticated
    if (!accessToken) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
                <BackgroundDecor />
                <LoginForm />
                <div className="absolute bottom-4 text-center w-full text-xs text-muted">
                    &copy; {new Date().getFullYear()} SaaS Platform. All rights reserved.
                </div>
            </div>
        );
    }

    // Show admin dashboard content
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                School Dashboard
            </h1>
            <p className="text-muted">Welcome to the School Administration Panel.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg glass-panel border-white/5">
                    <h3 className="text-lg font-medium text-muted">Total Students</h3>
                    <p className="text-2xl font-bold text-foreground">1,234</p>
                </div>
                <div className="p-6 rounded-lg glass-panel border-white/5">
                    <h3 className="text-lg font-medium text-muted">Total Teachers</h3>
                    <p className="text-2xl font-bold text-foreground">85</p>
                </div>
                <div className="p-6 rounded-lg glass-panel border-white/5">
                    <h3 className="text-lg font-medium text-muted">Active Classes</h3>
                    <p className="text-2xl font-bold text-foreground">42</p>
                </div>
            </div>
        </div>
    );
}
