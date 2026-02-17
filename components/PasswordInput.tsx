"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-6 py-4 text-lg bg-slate-900/50 border border-slate-700 rounded-xl",
          "text-slate-100 placeholder:text-slate-500",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
          "focus:animate-glow transition-all duration-300",
          "font-mono tracking-wide",
          className
        )}
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "p-2 rounded-lg hover:bg-slate-800 transition-colors",
          "text-slate-400 hover:text-slate-200"
        )}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
