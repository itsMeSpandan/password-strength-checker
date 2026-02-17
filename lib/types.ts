export interface GeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  easyToRead: boolean;
}

export interface PasswordStrengthResult {
  score: number;
  crackTimesDisplay: {
    onlineThrottling100PerHour: string;
    onlineNoThrottling10PerSecond: string;
    offlineSlowHashing1e4PerSecond: string;
    offlineFastHashing1e10PerSecond: string;
  };
  feedback: {
    warning: string;
    suggestions: string[];
  };
  calcTime: number;
}

export const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
export const NUMBER_CHARS = "0123456789";
export const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export const EASY_TO_READ_UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
export const EASY_TO_READ_LOWERCASE = "abcdefghjkmnpqrstuvwxyz";
export const EASY_TO_READ_NUMBERS = "23456789";
export const EASY_TO_READ_SYMBOLS = "!@#$%^&*-+=?";
