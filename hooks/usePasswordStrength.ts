"use client";

import { useState, useEffect } from "react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { PasswordStrengthResult } from "@/lib/types";
import { formatCrackTime } from "@/lib/password";

// Initialize zxcvbn
const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export function usePasswordStrength(password: string) {
  const [result, setResult] = useState<PasswordStrengthResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!password) {
      setResult(null);
      return;
    }

    setIsAnalyzing(true);

    // Debounce for performance
    const timeoutId = setTimeout(() => {
      const analysis = zxcvbn(password);

      const crackTimes = analysis.crackTimesSeconds;
      const crackTimesDisplay = {
        onlineThrottling100PerHour: formatCrackTime(crackTimes.onlineThrottling100PerHour),
        onlineNoThrottling10PerSecond: formatCrackTime(crackTimes.onlineNoThrottling10PerSecond),
        offlineSlowHashing1e4PerSecond: formatCrackTime(crackTimes.offlineSlowHashing1e4PerSecond),
        offlineFastHashing1e10PerSecond: formatCrackTime(crackTimes.offlineFastHashing1e10PerSecond),
      };

      setResult({
        score: analysis.score,
        crackTimesDisplay,
        feedback: {
          warning: analysis.feedback.warning || "",
          suggestions: analysis.feedback.suggestions || [],
        },
        calcTime: analysis.calcTime,
      });

      setIsAnalyzing(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [password]);

  return { result, isAnalyzing };
}
