import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-gray-400">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        ref={ref}
                        className={`
              w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white
              placeholder:text-gray-500
              focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20
              transition-all duration-300
              disabled:opacity-50
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
              ${className}
            `}
                        {...props}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                {error && (
                    <p className="text-sm text-red-400 animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
