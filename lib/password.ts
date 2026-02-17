import {
  GeneratorOptions,
  UPPERCASE_CHARS,
  LOWERCASE_CHARS,
  NUMBER_CHARS,
  SYMBOL_CHARS,
  EASY_TO_READ_UPPERCASE,
  EASY_TO_READ_LOWERCASE,
  EASY_TO_READ_NUMBERS,
  EASY_TO_READ_SYMBOLS,
} from "./types";

export function generatePassword(options: GeneratorOptions): string {
  let charset = "";
  let guaranteedChars: string[] = [];

  const chars = options.easyToRead
    ? {
        uppercase: EASY_TO_READ_UPPERCASE,
        lowercase: EASY_TO_READ_LOWERCASE,
        numbers: EASY_TO_READ_NUMBERS,
        symbols: EASY_TO_READ_SYMBOLS,
      }
    : {
        uppercase: UPPERCASE_CHARS,
        lowercase: LOWERCASE_CHARS,
        numbers: NUMBER_CHARS,
        symbols: SYMBOL_CHARS,
      };

  if (options.includeUppercase) {
    charset += chars.uppercase;
    guaranteedChars.push(chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)]);
  }
  if (options.includeLowercase) {
    charset += chars.lowercase;
    guaranteedChars.push(chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)]);
  }
  if (options.includeNumbers) {
    charset += chars.numbers;
    guaranteedChars.push(chars.numbers[Math.floor(Math.random() * chars.numbers.length)]);
  }
  if (options.includeSymbols) {
    charset += chars.symbols;
    guaranteedChars.push(chars.symbols[Math.floor(Math.random() * chars.symbols.length)]);
  }

  if (charset === "") {
    return "";
  }

  let password = "";
  const remainingLength = options.length - guaranteedChars.length;

  // Fill remaining characters
  for (let i = 0; i < remainingLength; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Add guaranteed characters
  password += guaranteedChars.join("");

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

export function formatCrackTime(seconds: number): string {
  if (seconds < 1) {
    return "Less than a second";
  }
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds`;
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }
  if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""}`;
  }
  if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  if (seconds < 3153600000) {
    const years = Math.floor(seconds / 31536000);
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return "Centuries";
}
