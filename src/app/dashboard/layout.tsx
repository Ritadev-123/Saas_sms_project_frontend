"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Sidebar />
            <Header />
            <main className="ml-64 pt-16 min-h-screen p-8">
                <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
