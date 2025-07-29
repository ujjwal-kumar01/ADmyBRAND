import { useState, useEffect, useCallback } from 'react'
import { metricsData, revenueData, trafficData, campaignData, tableData } from './data'

// Simulate real-time data updates
const generateRandomChange = (baseValue: number, maxChangePercent: number = 5) => {
  // Use a seeded random to ensure consistent results during SSR
  const seededRandom = () => {
    const x = Math.sin(Date.now() * 0.001) * 10000
    return x - Math.floor(x)
  }
  const changePercent = (seededRandom() - 0.5) * maxChangePercent
  return baseValue * (1 + changePercent / 100)
}

const updateMetricsData = () => {
  return metricsData.map(metric => {
    const baseValue = parseFloat(metric.value.replace(/[$,%]/g, ''))
    const newValue = generateRandomChange(baseValue, 3)
    
    return {
      ...metric,
      value: metric.value.includes('$') 
        ? `$${newValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : metric.value.includes('%') 
        ? `${newValue.toFixed(2)}%`
        : newValue.toLocaleString(),
      change: generateRandomChange(metric.change, 2)
    }
  })
}

const updateRevenueData = () => {
  return revenueData.map(item => ({
    ...item,
    revenue: generateRandomChange(item.revenue, 8),
    profit: generateRandomChange(item.profit, 8)
  }))
}

const updateTableData = () => {
  return tableData.map(row => ({
    ...row,
    clicks: Math.floor(generateRandomChange(row.clicks, 5)),
    impressions: Math.floor(generateRandomChange(row.impressions, 5)),
    ctr: parseFloat(generateRandomChange(row.ctr, 3).toFixed(2)),
    spend: Math.floor(generateRandomChange(row.spend, 4)),
    conversions: Math.floor(generateRandomChange(row.conversions, 6))
  }))
}

export function useRealTimeUpdates(intervalMs: number = 5000) {
  const [metrics, setMetrics] = useState(metricsData)
  const [revenue, setRevenue] = useState(revenueData)
  const [traffic] = useState(trafficData)
  const [campaign] = useState(campaignData)
  const [table, setTable] = useState(tableData)
  const [lastUpdate, setLastUpdate] = useState(() => new Date())

  const updateData = useCallback(() => {
    setMetrics(updateMetricsData())
    setRevenue(updateRevenueData())
    setTable(updateTableData())
    setLastUpdate(new Date())
  }, [])

  useEffect(() => {
    const interval = setInterval(updateData, intervalMs)
    return () => clearInterval(interval)
  }, [intervalMs, updateData])

  return {
    metrics,
    revenue,
    traffic,
    campaign,
    table,
    lastUpdate,
    updateData
  }
}

export function useLoadingState(initialLoading: boolean = true) {
  const [isLoading, setIsLoading] = useState(initialLoading)

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [initialLoading])

  return { isLoading, setIsLoading }
} 