"use client"

import { useState, useEffect } from "react"
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
import { ClientOnly } from "@/components/ClientOnly"

export default function Home() {
  const [isLiveMode, setIsLiveMode] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { metrics, revenue, traffic, campaign, table, lastUpdate, updateData } = useRealTimeUpdates(isLiveMode ? 5000 : 0)
  const { isLoading } = useLoadingState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <DashboardSkeleton />
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8 text-center transition-all duration-200 hover:scale-[1.01]">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-200 cursor-pointer">
              Dashboard
            </h2>
            <button
              onClick={updateData}
              className="p-1.5 sm:p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-110"
              aria-label="Refresh data"
            >
              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 max-w-2xl mx-auto px-4">
            Welcome to your analytics dashboard. Here's an overview of your performance.
          </p>
          <ClientOnly fallback={<div className="h-4" />}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-2">
              <p className="text-xs text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
              <RealTimeIndicator isActive={isLiveMode} />
            </div>
          </ClientOnly>
        </div>

        {/* Export Section */}
        <ClientOnly fallback={<div className="h-12" />}>
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
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
                                 link.setAttribute('download', `dashboard-export-${mounted ? new Date().toISOString().split('T')[0] : 'data'}.csv`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV
            </button>
            
            <button
              onClick={() => {
                try {
                  const currentDate = mounted ? new Date().toLocaleDateString() : 'Unknown Date'
                  const currentTime = mounted ? new Date().toLocaleTimeString() : 'Unknown Time'

                  // Create a comprehensive text report with safe data handling
                  const totalRevenue = revenue?.reduce((sum, item) => sum + (item?.revenue || 0), 0) || 0
                  const totalProfit = revenue?.reduce((sum, item) => sum + (item?.profit || 0), 0) || 0
                  const totalTraffic = traffic?.reduce((sum, item) => sum + (item?.value || 0), 0) || 0
                  const totalCampaigns = campaign?.reduce((sum, item) => sum + (item?.value || 0), 0) || 0

                  const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Analytics Dashboard Report</title>
                        <meta charset="utf-8">
                        <style>
                          @page { 
                            margin: 0.5in; 
                            size: A4;
                          }
                          body { 
                            font-family: Arial, sans-serif; 
                            margin: 0; 
                            padding: 20px; 
                            line-height: 1.6;
                            color: #333;
                            font-size: 12px;
                          }
                          .header { 
                            text-align: center; 
                            margin-bottom: 30px; 
                            border-bottom: 2px solid #333; 
                            padding-bottom: 20px; 
                          }
                          .header h1 { 
                            color: #333; 
                            margin: 0; 
                            font-size: 24px; 
                            font-weight: bold;
                          }
                          .header p { 
                            color: #666; 
                            margin: 10px 0 0 0; 
                            font-size: 14px;
                          }
                          .section { 
                            margin: 20px 0; 
                            padding: 15px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                          }
                          .section h3 { 
                            margin: 0 0 15px 0; 
                            color: #333; 
                            font-size: 16px;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 5px;
                          }
                          .summary-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 10px;
                            margin: 15px 0;
                          }
                          .summary-item {
                            padding: 8px;
                            background-color: #f8f9fa;
                            border-radius: 4px;
                            font-size: 11px;
                          }
                          .summary-item strong {
                            color: #333;
                          }
                          table { 
                            border-collapse: collapse; 
                            width: 100%; 
                            margin: 15px 0; 
                            font-size: 10px;
                          }
                          th, td { 
                            border: 1px solid #ddd; 
                            padding: 6px; 
                            text-align: left; 
                          }
                          th { 
                            background-color: #f8f9fa; 
                            font-weight: bold; 
                            color: #333; 
                          }
                          tr:nth-child(even) { 
                            background-color: #f9f9f9; 
                          }
                          .data-list {
                            margin: 10px 0;
                            font-size: 11px;
                          }
                          .data-item {
                            padding: 4px 0;
                            border-bottom: 1px solid #eee;
                          }
                          .footer { 
                            margin-top: 30px; 
                            text-align: center; 
                            color: #666; 
                            font-size: 10px; 
                            border-top: 1px solid #ddd; 
                            padding-top: 20px; 
                          }
                          @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                          }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <h1>Analytics Dashboard Report</h1>
                          <p>Generated on ${currentDate} at ${currentTime}</p>
                        </div>
                        
                        <div class="section">
                          <h3>Report Summary</h3>
                          <div class="summary-grid">
                            <div class="summary-item">
                              <strong>Total Campaigns:</strong> ${table?.length || 0}
                            </div>
                            <div class="summary-item">
                              <strong>Total Clicks:</strong> ${table?.reduce((sum, row) => sum + (row?.clicks || 0), 0).toLocaleString() || '0'}
                            </div>
                            <div class="summary-item">
                              <strong>Total Impressions:</strong> ${table?.reduce((sum, row) => sum + (row?.impressions || 0), 0).toLocaleString() || '0'}
                            </div>
                            <div class="summary-item">
                              <strong>Total Spend:</strong> $${table?.reduce((sum, row) => sum + (row?.spend || 0), 0).toLocaleString() || '0'}
                            </div>
                            <div class="summary-item">
                              <strong>Total Conversions:</strong> ${table?.reduce((sum, row) => sum + (row?.conversions || 0), 0).toLocaleString() || '0'}
                            </div>
                          </div>
                        </div>
                        
                        <div class="section">
                          <h3>Revenue Overview</h3>
                          <div class="summary-grid">
                            <div class="summary-item">
                              <strong>Total Revenue:</strong> $${totalRevenue.toLocaleString()}
                            </div>
                            <div class="summary-item">
                              <strong>Total Profit:</strong> $${totalProfit.toLocaleString()}
                            </div>
                          </div>
                          <div class="data-list">
                            <strong>Revenue by Month:</strong><br>
                            ${revenue?.map(item => `
                              <div class="data-item">
                                ${item?.month || 'Unknown'}: $${(item?.revenue || 0).toLocaleString()} (Profit: $${(item?.profit || 0).toLocaleString()})
                              </div>
                            `).join('') || 'No revenue data available'}
                          </div>
                        </div>
                        
                        <div class="section">
                          <h3>Traffic Sources</h3>
                          <div class="summary-item">
                            <strong>Total Traffic:</strong> ${totalTraffic.toLocaleString()}
                          </div>
                          <div class="data-list">
                            ${traffic?.map(item => `
                              <div class="data-item">
                                ${item?.name || 'Unknown'}: ${(item?.value || 0).toLocaleString()} (${totalTraffic > 0 ? ((item?.value || 0) / totalTraffic * 100).toFixed(1) : '0'}%)
                              </div>
                            `).join('') || 'No traffic data available'}
                          </div>
                        </div>
                        
                        <div class="section">
                          <h3>Campaign Performance</h3>
                          <div class="summary-item">
                            <strong>Total Campaign Value:</strong> ${totalCampaigns.toLocaleString()}
                          </div>
                          <div class="data-list">
                            ${campaign?.map(item => `
                              <div class="data-item">
                                ${item?.name || 'Unknown'}: ${(item?.value || 0).toLocaleString()}
                              </div>
                            `).join('') || 'No campaign data available'}
                          </div>
                        </div>
                        
                        <div class="section">
                          <h3>Detailed Campaign Data</h3>
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
                              ${table?.map(row => `
                                <tr>
                                  <td>${row?.campaign || 'Unknown'}</td>
                                  <td>${(row?.clicks || 0).toLocaleString()}</td>
                                  <td>${(row?.impressions || 0).toLocaleString()}</td>
                                  <td>${row?.ctr || 0}%</td>
                                  <td>$${(row?.spend || 0).toLocaleString()}</td>
                                  <td>${(row?.conversions || 0).toLocaleString()}</td>
                                  <td>${row?.status || 'Unknown'}</td>
                                  <td>${row?.date ? new Date(row.date).toLocaleDateString() : 'Unknown'}</td>
                                </tr>
                              `).join('') || '<tr><td colspan="8">No campaign data available</td></tr>'}
                            </tbody>
                          </table>
                        </div>
                        
                        <div class="footer">
                          <p>This report was generated from the Analytics Dashboard</p>
                          <p>© ${new Date().getFullYear()} ADmyBRAND Insights</p>
                        </div>
                      </body>
                    </html>
                  `

                  // Open in new window and trigger print to PDF
                  const pdfWindow = window.open('', '_blank', 'width=800,height=600')
                  if (!pdfWindow) {
                    alert('Please allow pop-ups for this site to export PDF')
                    return
                  }

                  pdfWindow.document.write(htmlContent)
                  pdfWindow.document.close()

                  // Auto-print to PDF after content loads
                  pdfWindow.onload = function() {
                    setTimeout(() => {
                      pdfWindow.print()
                      setTimeout(() => {
                        pdfWindow.close()
                      }, 1000)
                    }, 500)
                  }

                } catch (error) {
                  console.error('PDF export error:', error)
                  alert('Failed to generate PDF. Please try again.')
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </button>

            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
                             className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base ${
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
         </ClientOnly>

        {/* Metrics Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-4 mb-6 sm:mb-8">
          <div>
            <RevenueChart data={revenue} />
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <TrafficChart data={traffic} />
            <CampaignChart data={campaign} />
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={table} />
      </main>
    </div>
  )
}
