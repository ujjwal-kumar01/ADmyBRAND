"use client"

import { useState, useEffect } from "react"
import { Circle } from "lucide-react"

interface RealTimeIndicatorProps {
  isActive?: boolean
  className?: string
}

export function RealTimeIndicator({ isActive = true, className = "" }: RealTimeIndicatorProps) {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
      <Circle 
        className={`h-2 w-2 ${isBlinking ? 'text-green-500' : 'text-green-400'} transition-colors duration-200`} 
        fill="currentColor"
      />
      <span>Live</span>
    </div>
  )
} 