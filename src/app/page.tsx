"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { MetricCard } from "@/components/MetricCard"
import { RevenueChart } from "@/components/RevenueChart"
import { TrafficChart } from "@/components/TrafficChart"
import { CampaignChart } from "@/components/CampaignChart"
import { DataTable } from "@/components/DataTable"
import { DashboardSkeleton } from "@/components/LoadingSkeletons"
import { useRealTimeUpdates, useLoadingState } from "@/lib/hooks"
import { RefreshCw, FileSpreadsheet, FileText, Circle } from "lucide-react"
import { RealTimeIndicator } from "@/components/RealTimeIndicator"

export default function Home() {
  const [isLiveMode, setIsLiveMode] = useState(true)
  const { metrics, revenue, traffic, campaign, table, lastUpdate, updateData } = useRealTimeUpdates(isLiveMode ? 5000 : 0)
  const { isLoading } = useLoadingState(true)

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center transition-all duration-200 hover:scale-[1.01]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-200 cursor-pointer">
              Dashboard
            </h2>
            <button
              onClick={updateData}
              className="p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-110"
              aria-label="Refresh data"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          <p className="text-muted-foreground hover:text-foreground transition-colors duration-200 max-w-2xl mx-auto">
            Welcome to your analytics dashboard. Here's an overview of your performance.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
            <RealTimeIndicator isActive={isLiveMode} />
          </div>
        </div>

        {/* Export Section */}
        <div className="mb-8 flex justify-center">
          <div className="flex gap-4">
            <button
              onClick={() => {
                // CSV Export
                const headers = ['Campaign', 'Clicks', 'Impressions', 'CTR', 'Spend', 'Conversions', 'Status', 'Date']
                const csvContent = [
                  headers.join(','),
                  ...table.map(row => [
                    `"${row.campaign}"`,
                    row.clicks,
                    row.impressions,
                    `${row.ctr}%`,
                    `$${row.spend.toLocaleString()}`,
                    row.conversions,
                    row.status,
                    row.date
                  ].join(','))
                ].join('\n')

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const link = document.createElement('a')
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV
            </button>
            
            <button
              onClick={() => {
                // PDF Export
                const tableHTML = `
                  <html>
                    <head>
                      <style>
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .header { text-align: center; margin-bottom: 20px; }
                      </style>
                    </head>
                    <body>
                      <div class="header">
                        <h1>Analytics Dashboard Report</h1>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Campaign</th>
                            <th>Clicks</th>
                            <th>Impressions</th>
                            <th>CTR</th>
                            <th>Spend</th>
                            <th>Conversions</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${table.map(row => `
                            <tr>
                              <td>${row.campaign}</td>
                              <td>${row.clicks.toLocaleString()}</td>
                              <td>${row.impressions.toLocaleString()}</td>
                              <td>${row.ctr}%</td>
                              <td>$${row.spend.toLocaleString()}</td>
                              <td>${row.conversions.toLocaleString()}</td>
                              <td>${row.status}</td>
                              <td>${new Date(row.date).toLocaleDateString()}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </body>
                  </html>
                `

                const blob = new Blob([tableHTML], { type: 'text/html' })
                const link = document.createElement('a')
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', `dashboard-export-${new Date().toISOString().split('T')[0]}.html`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </button>

            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${
                isLiveMode 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <Circle className={`h-4 w-4 ${isLiveMode ? 'animate-pulse' : ''}`} />
              {isLiveMode ? 'Live Mode' : 'Static Mode'}
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <RevenueChart data={revenue} />
          <TrafficChart data={traffic} />
          <CampaignChart data={campaign} />
        </div>

        {/* Data Table */}
        <DataTable data={table} />
      </main>
    </div>
  )
}
