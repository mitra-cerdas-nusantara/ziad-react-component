# Ziad Components 🚀

A premium collection of high-performance, accessible, and beautifully designed React components. Built with **Radix UI**, **Tailwind CSS**, and **TypeScript**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-black)](https://www.radix-ui.com/)

---

## ✨ Features

- 💎 **Premium Design**: Built-in glassmorphism, smooth animations, and curated dark color palettes.
- ♿ **Accessible**: Powered by Radix UI primitives for full WAI-ARIA compliance.
- 🎨 **Shadcn Compatible**: Easily integrates with your existing shadcn/ui projects.
- 📦 **Type Safe**: First-class TypeScript support for a better developer experience.
- 🏗️ **Highly Customizable**: Uses standard Tailwind CSS variables for easy branding.

## 🛠️ Components Included

- **Button**: Multiple variants including a unique "Premium" gradient style.
- **Select**: Elegant dropdown selection with advanced accessibility.
- **SelectAsync**: Searchable dropdown that loads data asynchronously.
- **MultiSelect**: Object-based multi-selection with badge triggers.
- **MultiSelectAsync**: Asynchronous multi-selection with searchable interface.
- **Dialog (Modal)**: Accessible modals with backdrop blur.
- **Card**: Structural components for building modern layouts.
- **Badge**: Clean indicators for status and tagging.
- **Input**: Glassmorphism-styled input field.

## 📦 Using in Other Projects

Ziad Components follow the **shadcn/ui** philosophy: you own the code. You can copy the components into your project and customize them.

### 1. Installation

Install the required dependencies in your project:

```bash
npm install @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-slot lucide-react clsx tailwind-merge
```

### 2. Copy the Utility

Ensure you have the `cn` utility in `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Setup Tailwind Config

Add the custom colors and animations to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... add other shadcn variables
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
}
```

### 4. Copy Components

Simply copy the desired component from `src/components/ui/` into your own `components/ui/` directory.

```bash
cp ziad-react-component/src/components/ui/SelectAsync.tsx your-project/src/components/ui/
```

## 🚀 Development

If you want to run this showcase project locally:

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/mitra-cerdas-nusantara/ziad-react-component.git

# Navigate to the project
cd ziad-react-component

# Install dependencies
npm install
```

### 2. Start development server

```bash
npm run dev
```

## 🏗️ Project Structure

```text
src/
├── components/
│   └── ui/          # Standardized UI components
├── lib/
│   └── utils.ts     # shadcn-compatible utility (cn)
├── App.tsx          # Showcase dashboard
└── main.tsx         # Entry point
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by [Mitra Cerdas Nusantara](https://github.com/mitra-cerdas-nusantara)
