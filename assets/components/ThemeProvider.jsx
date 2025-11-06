"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme("dark");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      suppressHydrationWarning
      variant="outline"
      size="icon"
      className="dark:border-foreground bg-transparent dark:bg-transparent dark:text-white"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-oid="knxchgl"
    >
      {theme === "dark" ? (
        <Moon
          suppressHydrationWarning
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:text-foreground transition-all dark:rotate-0 dark:scale-100"
          data-oid="lncmky-"
        />
      ) : (
        <Sun
          suppressHydrationWarning
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          data-oid=":_b94hm"
        />
      )}
      <span className="sr-only" data-oid="a5cyjhg">
        Toggle theme
      </span>
    </Button>
  );
}
