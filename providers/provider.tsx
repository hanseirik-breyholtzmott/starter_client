"use client";
import React, { ReactNode } from "react"

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
    return (
      
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      
    );
  }