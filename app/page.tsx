"use client";

import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { PasswordInput } from "@/components/PasswordInput";
import { StrengthMeter } from "@/components/StrengthMeter";
import { FeedbackDisplay } from "@/components/FeedbackDisplay";
import { CrackTimeDisplay } from "@/components/CrackTimeDisplay";
import { Generator } from "@/components/Generator";

type Mode = "check" | "generate";

export default function Home() {
  const [mode, setMode] = useState<Mode>("check");
  const [password, setPassword] = useState("");
  const { result } = usePasswordStrength(password);

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4 sm:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 mb-6 shadow-lg shadow-cyan-500/30">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Password Strength Meter
          </h1>
          <p className="text-slate-400 text-lg">
            Analyze password security with advanced entropy calculation
          </p>
        </div>

        {/* Main Card */}
        <div className="glassmorphism rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 bg-slate-900/80 rounded-xl mb-8">
            <button
              onClick={() => setMode("check")}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200",
                "flex items-center justify-center gap-2",
                mode === "check"
                  ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Lock size={18} />
              Check Strength
            </button>
            <button
              onClick={() => setMode("generate")}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200",
                "flex items-center justify-center gap-2",
                mode === "generate"
                  ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Sparkles size={18} />
              Generate Password
            </button>
          </div>

          {/* Content */}
          {mode === "check" ? (
            <div className="space-y-6">
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Enter Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Type or paste your password"
                />
              </div>

              {/* Results */}
              {password && result && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Strength Meter */}
                  <StrengthMeter score={result.score} />

                  {/* Feedback */}
                  {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
                    <FeedbackDisplay
                      warning={result.feedback.warning}
                      suggestions={result.feedback.suggestions}
                      score={result.score}
                    />
                  )}

                  {/* Crack Time Display */}
                  <CrackTimeDisplay crackTimesDisplay={result.crackTimesDisplay} />

                  {/* Analysis Time */}
                  <div className="text-xs text-slate-500 text-center">
                    Analysis completed in {result.calcTime}ms
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!password && (
                <div className="text-center py-12">
                  <Lock className="mx-auto mb-4 text-slate-600" size={48} />
                  <p className="text-slate-400">
                    Enter a password to see its strength analysis
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    All processing happens locally in your browser
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-200 mb-2">
                  Generate Secure Password
                </h2>
                <p className="text-sm text-slate-400">
                  Customize your password with the options below
                </p>
              </div>
              <Generator
                onPasswordGenerated={(pwd) => {
                  setPassword(pwd);
                  setMode("check");
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Powered by{" "}
            <a
              href="https://github.com/zxcvbn-ts/zxcvbn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              zxcvbn-ts
            </a>
            {" • "}
            Privacy-first: No data leaves your device
          </p>
        </div>
      </div>
    </main>
  );
}
