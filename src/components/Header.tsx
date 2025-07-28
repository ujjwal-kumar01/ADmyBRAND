"use client"

import { Bell, Settings, User, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">ADmyBRAND Insights</h1>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer">
              ADmyBRAND Insights
            </h1>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary hover:text-red-500 rounded-md transition-all duration-200 hover:scale-105 relative group font-medium">
                Dashboard
                <span className=" absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className=" hover:text-red-500 hover:text-primary transition-all duration-200 hover:scale-105 relative group font-medium">
                Analytics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-red-500 hover:text-primary transition-all duration-200 hover:scale-105 relative group font-medium">
                Campaigns
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-red-500 hover:text-primary transition-all duration-200 hover:scale-105 relative group font-medium">
                Reports
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 w-64 hover:border-primary/50 group-hover:border-primary/50"
              />
            </div>
            
            <ThemeToggle />
            
            <button 
              className="p-2 hover:bg-primary/10 hover:bg-gray-300 hover:text-black rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md group"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
            </button>
            
            <button 
              className="p-2 hover:bg-primary/10 hover:bg-gray-300 hover:text-black rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md group"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
            </button>
            
            <button className="flex items-center hover:bg-gray-300 hover:text-black gap-2 p-2 hover:bg-primary/10 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-colors duration-200 group-hover:scale-110">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden md:block text-sm font-medium group-hover:text-primary transition-colors duration-200">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 