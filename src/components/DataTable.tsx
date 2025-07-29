"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tableData, TableData } from "@/lib/data"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { useState, useMemo, useEffect } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { DateRangePicker } from "./DateRangePicker"

type SortField = keyof TableData
type SortDirection = 'asc' | 'desc'

interface DataTableProps {
  data?: TableData[]
}

export function DataTable({ data = tableData }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" })
  const [mounted, setMounted] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredData = useMemo(() => {
    const filtered = data.filter(item => {
      const matchesSearch = item.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      
      // Date range filtering
      const matchesDateRange = dateRange.startDate && dateRange.endDate
        ? (() => {
            const itemDate = new Date(item.date)
            const startDate = new Date(dateRange.startDate)
            const endDate = new Date(dateRange.endDate)
            return itemDate >= startDate && itemDate <= endDate
          })()
        : true
      
      return matchesSearch && matchesStatus && matchesDateRange
    })

    return filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
  }, [data, searchTerm, sortField, sortDirection, statusFilter, dateRange])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    if (!mounted) return dateString // Return raw string during SSR
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  if (!mounted) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Campaign Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid gap-4">
        <DateRangePicker 
          onDateRangeChange={setDateRange}
        />
      </div>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="hover:text-primary transition-colors duration-200 text-sm sm:text-base">Campaign Analytics</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 group-hover:border-primary/50 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 hover:bg-muted/50 text-sm"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b">
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('campaign')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Campaign
                    {sortField === 'campaign' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Clicks
                    {sortField === 'clicks' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('impressions')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Impressions
                    {sortField === 'impressions' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('ctr')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    CTR
                    {sortField === 'ctr' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('spend')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Spend
                    {sortField === 'spend' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('conversions')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Conversions
                    {sortField === 'conversions' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
                <th className="text-left p-1 sm:p-2">Status</th>
                <th 
                  className="text-left p-1 sm:p-2 cursor-pointer hover:bg-muted/50 transition-all duration-200 hover:text-primary group"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    Date
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-muted/50 transition-all duration-200 hover:shadow-sm group cursor-pointer">
                  <td className="p-1 sm:p-2 font-medium group-hover:text-primary transition-colors duration-200">{row.campaign}</td>
                  <td className="p-1 sm:p-2 group-hover:text-primary transition-colors duration-200">{formatNumber(row.clicks)}</td>
                  <td className="p-1 sm:p-2 group-hover:text-primary transition-colors duration-200">{formatNumber(row.impressions)}</td>
                  <td className="p-1 sm:p-2 group-hover:text-primary transition-colors duration-200">{row.ctr}%</td>
                  <td className="p-1 sm:p-2 group-hover:text-primary transition-colors duration-200">{formatCurrency(row.spend)}</td>
                  <td className="p-1 sm:p-2 group-hover:text-primary transition-colors duration-200">{formatNumber(row.conversions)}</td>
                  <td className="p-1 sm:p-2">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-1 sm:p-2 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {formatDate(row.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
            >
              Previous
            </button>
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
} 