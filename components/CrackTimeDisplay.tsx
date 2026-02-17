"use client";

import { Clock, Shield, Zap, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrackTimeDisplayProps {
  crackTimesDisplay: {
    onlineThrottling100PerHour: string;
    onlineNoThrottling10PerSecond: string;
    offlineSlowHashing1e4PerSecond: string;
    offlineFastHashing1e10PerSecond: string;
  };
}

export function CrackTimeDisplay({ crackTimesDisplay }: CrackTimeDisplayProps) {
  const scenarios = [
    {
      icon: Shield,
      label: "Online (Throttled)",
      time: crackTimesDisplay.onlineThrottling100PerHour,
      description: "100 attempts/hour",
      color: "text-emerald-400",
    },
    {
      icon: Zap,
      label: "Online (Fast)",
      time: crackTimesDisplay.onlineNoThrottling10PerSecond,
      description: "10 attempts/second",
      color: "text-yellow-400",
    },
    {
      icon: Server,
      label: "Offline (Slow)",
      time: crackTimesDisplay.offlineSlowHashing1e4PerSecond,
      description: "10k attempts/second",
      color: "text-orange-400",
    },
    {
      icon: Clock,
      label: "Offline (Fast)",
      time: crackTimesDisplay.offlineFastHashing1e10PerSecond,
      description: "10B attempts/second",
      color: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
        <Clock size={16} className="text-cyan-400" />
        Time to Crack
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return (
            <div
              key={index}
              className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("flex-shrink-0 mt-0.5", scenario.color)} size={18} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    {scenario.label}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mb-1 truncate">
                    {scenario.time}
                  </div>
                  <div className="text-xs text-slate-500">
                    {scenario.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
