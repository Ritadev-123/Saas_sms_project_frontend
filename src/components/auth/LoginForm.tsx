"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { SocialLogin } from "./SocialLogin";
import { API_BASE_URL } from "@/lib/env";

export const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_BASE_URL}/platform/auth/login`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message || "Login successful!");
                console.log("Login Success:", data);
                // Store tokens in localStorage
                localStorage.setItem('access_token', data.data.access_token);
                localStorage.setItem('refresh_token', data.data.refresh_token);

                // Store tokens in cookies
                document.cookie = `access_token=${data.data.access_token}; path=/; secure; samesite=strict`;
                document.cookie = `refresh_token=${data.data.refresh_token}; path=/; secure; samesite=strict`;

                // Redirect to dashboard
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setError(data.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Card className="w-full max-w-md relative z-10 border-white/10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-400">
                    Sign in to access your dashboard
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                <div className="space-y-1">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:text-accent transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        {success}
                    </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign In
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#0a0a0f] text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <SocialLogin />
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:text-accent font-medium transition-colors">
                    Sign up now
                </Link>
            </div>
        </Card>
    );
};
