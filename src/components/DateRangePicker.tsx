"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DateRange {
  startDate: string
  endDate: string
}

interface DateRangePickerProps {
  onDateRangeChange: (range: DateRange) => void
  className?: string
}

export function DateRangePicker({ onDateRangeChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: ""
  })

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const newRange = { ...dateRange, [field]: value }
    setDateRange(newRange)
    onDateRangeChange(newRange)
  }

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Select dates"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 hover:text-primary transition-colors duration-200 text-sm sm:text-base">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          Date Range Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium mb-2 text-muted-foreground">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="w-full px-2 sm:px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 text-sm"
                aria-label="Start date"
                title="Select start date"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium mb-2 text-muted-foreground">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="w-full px-2 sm:px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 text-sm"
                aria-label="End date"
                title="Select end date"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const today = new Date()
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                const newRange = {
                  startDate: weekAgo.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                }
                setDateRange(newRange)
                onDateRangeChange(newRange)
              }}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => {
                const today = new Date()
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
                const newRange = {
                  startDate: monthAgo.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                }
                setDateRange(newRange)
                onDateRangeChange(newRange)
              }}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => {
                setDateRange({ startDate: "", endDate: "" })
                onDateRangeChange({ startDate: "", endDate: "" })
              }}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              Clear
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 