"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeneratorOptions } from "@/lib/types";
import { generatePassword, copyToClipboard } from "@/lib/password";
import { PasswordInput } from "./PasswordInput";

interface GeneratorProps {
  onPasswordGenerated?: (password: string) => void;
}

export function Generator({ onPasswordGenerated }: GeneratorProps) {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    easyToRead: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const password = generatePassword(options);
    setGeneratedPassword(password);
    onPasswordGenerated?.(password);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (generatedPassword) {
      const success = await copyToClipboard(generatedPassword);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const updateOption = <K extends keyof GeneratorOptions>(
    key: K,
    value: GeneratorOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const hasAtLeastOneCharType =
    options.includeUppercase ||
    options.includeLowercase ||
    options.includeNumbers ||
    options.includeSymbols;

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      {generatedPassword && (
        <div className="space-y-3">
          <PasswordInput
            value={generatedPassword}
            onChange={setGeneratedPassword}
            placeholder="Generated password will appear here"
          />
          <button
            onClick={handleCopy}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
              "flex items-center justify-center gap-2",
              copied
                ? "bg-emerald-500 text-white"
                : "bg-cyan-600 hover:bg-cyan-500 text-white"
            )}
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      )}

      {/* Length Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-300">
            Password Length
          </label>
          <span className="text-sm font-bold text-cyan-400 bg-slate-800 px-3 py-1 rounded-lg">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min="8"
          max="64"
          value={options.length}
          onChange={(e) => updateOption("length", parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Character Type Checkboxes */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300 block mb-3">
          Character Types
        </label>
        
        <label className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800">
          <span className="text-sm text-slate-200">Uppercase (A-Z)</span>
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={(e) => updateOption("includeUppercase", e.target.checked)}
            className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800">
          <span className="text-sm text-slate-200">Lowercase (a-z)</span>
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={(e) => updateOption("includeLowercase", e.target.checked)}
            className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800">
          <span className="text-sm text-slate-200">Numbers (0-9)</span>
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) => updateOption("includeNumbers", e.target.checked)}
            className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800">
          <span className="text-sm text-slate-200">Symbols (!@#$...)</span>
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) => updateOption("includeSymbols", e.target.checked)}
            className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Easy to Read Option */}
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800">
          <div>
            <span className="text-sm text-slate-200 block">Easy to Read</span>
            <span className="text-xs text-slate-400">
              Excludes ambiguous characters (l, 1, O, 0)
            </span>
          </div>
          <input
            type="checkbox"
            checked={options.easyToRead}
            onChange={(e) => updateOption("easyToRead", e.target.checked)}
            className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!hasAtLeastOneCharType}
        className={cn(
          "w-full py-4 px-4 rounded-xl font-semibold transition-all duration-200",
          "flex items-center justify-center gap-2",
          hasAtLeastOneCharType
            ? "bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-cyan-500/50"
            : "bg-slate-800 text-slate-500 cursor-not-allowed"
        )}
      >
        <RefreshCw size={20} />
        Generate Password
      </button>

      {!hasAtLeastOneCharType && (
        <p className="text-sm text-rose-400 text-center">
          Please select at least one character type
        </p>
      )}
    </div>
  );
}
