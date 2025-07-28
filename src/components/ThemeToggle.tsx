"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { useState, useRef, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      default:
        return "System"
    }
  }

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md group"
        aria-label="Toggle theme"
      >
        <div className="group-hover:text-primary transition-colors duration-200">
          {getThemeIcon()}
        </div>
        <span className="hidden md:block text-sm group-hover:text-primary transition-colors duration-200">{getThemeLabel()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-card border rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-1">
            <button
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-all duration-200 hover:scale-105 group ${
                theme === "light" ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <Sun className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
              Light
            </button>
            <button
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-all duration-200 hover:scale-105 group ${
                theme === "dark" ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <Moon className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
              Dark
            </button>
            <button
              onClick={() => {
                setTheme("system")
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-all duration-200 hover:scale-105 group ${
                theme === "system" ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <Monitor className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 