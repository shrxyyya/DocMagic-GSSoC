"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// Import React for ReactNode type
import * as React from "react";

// Define ThemeProviderProps type locally with correct types
type Attribute = "class" | "data-theme" | "data-mode";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  themes?: string[];
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}