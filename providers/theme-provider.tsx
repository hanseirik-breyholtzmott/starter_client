"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Suppress hydration warning by forcing client-side only rendering
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextThemesProvider {...props} forcedTheme="light">
        {children}
      </NextThemesProvider>
    );
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
