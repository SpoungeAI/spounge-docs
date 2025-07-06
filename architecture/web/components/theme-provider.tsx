import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme?: Theme
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  enableSystem = true,
  attribute = "data-theme",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [systemTheme, setSystemTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const applyTheme = (newTheme: Theme) => {
      if (disableTransitionOnChange) {
        document.documentElement.classList.add("disable-transitions")
      }

      let appliedTheme: Theme = newTheme
      if (newTheme === "system" && enableSystem) {
        appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setSystemTheme(appliedTheme)
      }

      root.setAttribute(attribute, appliedTheme)
      root.classList.add(appliedTheme)

      if (disableTransitionOnChange) {
        setTimeout(() => {
          document.documentElement.classList.remove("disable-transitions")
        }, 0)
      }
    }

    applyTheme(theme)

    // Update theme when system preference changes
    if (theme === "system" && enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light"
        setSystemTheme(newSystemTheme)
        applyTheme("system")
      }
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, enableSystem, attribute, disableTransitionOnChange])

  useEffect(() => {
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
    systemTheme
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}
