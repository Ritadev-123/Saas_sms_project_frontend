"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const organisationMenu = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "User", href: "/dashboard/user", icon: "👤" },
    { name: "Organisation", href: "/dashboard/organisation", icon: "🏢" },
    { name: "Payment", href: "/dashboard/payment", icon: "💳" },
    { name: "Subscription", href: "/dashboard/subscription", icon: "🔄" },
    { name: "School", href: "/dashboard/school", icon: "🎓" },
    { name: "Plan", href: "/dashboard/plan", icon: "📝" },
];

const schoolMenu = [
    { name: "Home", href: "/admin/dashboard", icon: "🏠" },
    { name: "Social", href: "/admin/social", icon: "💬" },
];

export function Sidebar() {
    const pathname = usePathname();
    const role = useAppSelector((state) => state.auth.role);

    const menuItems = role === "school" ? schoolMenu : organisationMenu;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-glass-border bg-glass-bg backdrop-blur-xl transition-transform">
            <div className="flex h-16 items-center border-b border-glass-border px-6">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {role === "school" ? "School Admin" : "Organisation"}
                </h2>
            </div>

            <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)]">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted hover:bg-secondary hover:text-foreground"
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
