import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackgroundDecor />

      <LoginForm />

      {/* Footer / Copyright */}
      <div className="absolute bottom-4 text-center w-full text-xs text-gray-600">
        &copy; {new Date().getFullYear()} SaaS Platform. All rights reserved.
      </div>
    </div>
  );
}
