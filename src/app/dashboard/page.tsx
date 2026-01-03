"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Basic protection check - in a real app, verify token validity
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        // Clear all storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Clear cookies
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        router.push('/');
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        SaaS Platform
                    </h1>
                    <p className="text-gray-400 text-sm">Enterprise Dashboard</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-white/5">
                    Log Out
                </Button>
            </header>

            <main className="max-w-7xl mx-auto space-y-8">
                <section>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Here's what's happening with your projects today.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" />
                    <DashboardCard title="Active Users" value="+2350" change="+180.1% from last month" />
                    <DashboardCard title="Sales" value="+12,234" change="+19% from last month" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <Card className="p-6 glass-panel border-white/5 min-h-[300px]">
                        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        ⚡
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">New project created</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className="p-6 glass-panel border-white/5 min-h-[300px] flex items-center justify-center text-gray-500">
                        Chart Components Coming Soon
                    </Card>
                </div>
            </main>
        </div>
    );
}

const DashboardCard = ({ title, value, change }: { title: string, value: string, change: string }) => (
    <Card className="p-6 glass-panel border-white/5 hover:border-primary/50 transition-colors cursor-pointer group">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-gray-400 mt-1">{change}</p>
    </Card>
);
