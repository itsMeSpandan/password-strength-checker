# Password Strength Meter & Generator

A production-ready **Password Strength Meter & Generator** built with Next.js 15, TypeScript, and Tailwind CSS. This application provides real-time password strength analysis using the advanced `zxcvbn` algorithm and includes a customizable password generator.

## ✨ Features

### Password Strength Checker
- **Real-time Analysis**: Instant feedback as you type
- **Advanced Entropy Calculation**: Powered by `@zxcvbn-ts/core` for realistic security assessment
- **Score Rating**: 0-4 scale with visual color-coded meter
- **Detailed Feedback**: Specific warnings and actionable suggestions
- **Crack Time Estimates**: Shows how long it would take to crack under different attack scenarios:
  - Online (Throttled) - 100 attempts/hour
  - Online (Fast) - 10 attempts/second
  - Offline (Slow) - 10k attempts/second
  - Offline (Fast) - 10B attempts/second

### Password Generator
- **Customizable Length**: 8-64 characters with slider control
- **Character Type Selection**:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*...)
- **Easy to Read Mode**: Excludes ambiguous characters (l, 1, O, 0)
- **One-click Copy**: Copy generated passwords to clipboard with visual feedback
- **Smart Generation**: Guarantees at least one character from each selected type

### UI/UX Features
- **Cyberpunk Minimalist Design**: Dark mode with neon accents
- **Glassmorphism Effects**: Modern translucent card design
- **Responsive Layout**: Mobile-first design that works on all devices
- **Show/Hide Toggle**: Secure password input with visibility control
- **Smooth Animations**: Polished transitions and visual feedback
- **Privacy-First**: 100% client-side processing - no data leaves your browser

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
passwordStrength/
├── app/
│   ├── layout.tsx          # Root layout with font and theme
│   ├── page.tsx            # Main page with mode toggle
│   └── globals.css         # Global styles and utilities
├── components/
│   ├── PasswordInput.tsx   # Password input with show/hide toggle
│   ├── StrengthMeter.tsx   # Visual strength meter component
│   ├── FeedbackDisplay.tsx # Feedback warnings and suggestions
│   ├── CrackTimeDisplay.tsx # Crack time scenarios display
│   └── Generator.tsx       # Password generator with options
├── hooks/
│   └── usePasswordStrength.ts # Custom hook for zxcvbn integration
├── lib/
│   ├── utils.ts            # Utility functions (cn helper)
│   ├── types.ts            # TypeScript type definitions
│   └── password.ts         # Password generation and utilities
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Password Analysis**: [@zxcvbn-ts/core](https://zxcvbn-ts.github.io/zxcvbn/)
- **Utilities**: `clsx` & `tailwind-merge`

## 🎨 Design System

### Color Palette
- **Background**: Slate 950 (`#020617`)
- **Success/Strong**: Emerald/Cyan accents
- **Warning/Fair**: Yellow accents
- **Danger/Weak**: Rose/Red accents
- **Glassmorphism**: Translucent slate with blur

### Strength Levels
| Score | Label | Color |
|-------|-------|-------|
| 0 | Very Weak | Rose (Red) |
| 1 | Weak | Orange |
| 2 | Fair | Yellow |
| 3 | Good | Lime |
| 4 | Strong | Emerald (Green) |

## 🔒 Security & Privacy

- **Client-Side Only**: All password analysis happens in your browser
- **No Server Calls**: Passwords never leave your device
- **No Logging**: No analytics or tracking of password data
- **Open Source Algorithm**: Uses the industry-standard zxcvbn library

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) for the password strength algorithm
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Vercel](https://vercel.com/) for Next.js and deployment platform

---

**Built with ❤️ using Next.js and TypeScript**
