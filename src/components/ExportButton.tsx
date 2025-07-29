"use client"

import { useState } from "react"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableData } from "@/lib/data"

interface ExportButtonProps {
  data: TableData[]
  className?: string
}

export function ExportButton({ data, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = () => {
    setIsExporting(true)
    
    // Create CSV content
    const headers = ['Campaign', 'Clicks', 'Impressions', 'CTR', 'Spend', 'Conversions', 'Status', 'Date']
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
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

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `campaign-analytics-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsExporting(false)
  }

  const exportToPDF = () => {
    setIsExporting(true)
    
    // Create a simple HTML table for PDF
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
            <h1>Campaign Analytics Report</h1>
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
              ${data.map(row => `
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

    // Create and download file
    const blob = new Blob([tableHTML], { type: 'text/html' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `campaign-analytics-${new Date().toISOString().split('T')[0]}.html`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsExporting(false)
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            aria-label="Export to CSV"
          >
            <FileSpreadsheet className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
          
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            aria-label="Export to PDF"
          >
            <FileText className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
} 