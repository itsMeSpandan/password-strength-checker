"use client";

import { cn } from "@/lib/utils";

interface StrengthMeterProps {
  score: number;
  className?: string;
}

const scoreConfig = [
  { color: "bg-rose-500", label: "Very Weak", textColor: "text-rose-500" },
  { color: "bg-orange-500", label: "Weak", textColor: "text-orange-500" },
  { color: "bg-yellow-500", label: "Fair", textColor: "text-yellow-500" },
  { color: "bg-lime-500", label: "Good", textColor: "text-lime-500" },
  { color: "bg-emerald-500", label: "Strong", textColor: "text-emerald-500" },
];

export function StrengthMeter({ score, className }: StrengthMeterProps) {
  const config = scoreConfig[score];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-500 ease-out",
              index <= score
                ? cn(config.color, "shadow-lg")
                : "bg-slate-800"
            )}
            style={
              index <= score
                ? {
                    boxShadow: `0 0 10px ${
                      config.color === "bg-emerald-500"
                        ? "rgba(16, 185, 129, 0.5)"
                        : config.color === "bg-lime-500"
                        ? "rgba(132, 204, 22, 0.5)"
                        : config.color === "bg-yellow-500"
                        ? "rgba(234, 179, 8, 0.5)"
                        : config.color === "bg-orange-500"
                        ? "rgba(249, 115, 22, 0.5)"
                        : "rgba(244, 63, 94, 0.5)"
                    }`,
                  }
                : undefined
            }
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className={cn("text-sm font-semibold", config.textColor)}>
          {config.label}
        </span>
        <span className="text-xs text-slate-400">
          Score: {score}/4
        </span>
      </div>
    </div>
  );
}
