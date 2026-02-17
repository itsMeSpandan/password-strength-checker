"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackDisplayProps {
  warning?: string;
  suggestions?: string[];
  score: number;
}

export function FeedbackDisplay({ warning, suggestions, score }: FeedbackDisplayProps) {
  if (!warning && (!suggestions || suggestions.length === 0)) {
    return null;
  }

  const Icon = score >= 3 ? CheckCircle2 : score >= 2 ? Info : AlertTriangle;
  const iconColor = score >= 3 ? "text-emerald-400" : score >= 2 ? "text-yellow-400" : "text-rose-400";
  const bgColor = score >= 3 ? "bg-emerald-500/10" : score >= 2 ? "bg-yellow-500/10" : "bg-rose-500/10";
  const borderColor = score >= 3 ? "border-emerald-500/30" : score >= 2 ? "border-yellow-500/30" : "border-rose-500/30";

  return (
    <div className={cn("p-4 rounded-xl border", bgColor, borderColor)}>
      <div className="space-y-3">
        {warning && (
          <div className="flex items-start gap-3">
            <Icon className={cn("mt-0.5 flex-shrink-0", iconColor)} size={18} />
            <p className="text-sm text-slate-200 font-medium">{warning}</p>
          </div>
        )}
        
        {suggestions && suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-300">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
