export interface MetricCard {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
}

export interface ChartData {
  name: string
  value?: number
  revenue?: number
  profit?: number
  clicks?: number
  impressions?: number
  ctr?: number
}

export interface TableData {
  id: string
  campaign: string
  clicks: number
  impressions: number
  ctr: number
  spend: number
  conversions: number
  status: 'active' | 'paused' | 'completed'
  date: string
}

export const metricsData: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeType: "increase",
    icon: "dollar-sign"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 12.5,
    changeType: "increase",
    icon: "users"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: -2.1,
    changeType: "decrease",
    icon: "trending-up"
  },
  {
    title: "Growth",
    value: "+15.3%",
    change: 15.3,
    changeType: "increase",
    icon: "bar-chart-3"
  }
]

export const revenueData: ChartData[] = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
  { name: "Aug", revenue: 4000, profit: 2400 },
  { name: "Sep", revenue: 3000, profit: 1398 },
  { name: "Oct", revenue: 2000, profit: 9800 },
  { name: "Nov", revenue: 2780, profit: 3908 },
  { name: "Dec", revenue: 1890, profit: 4800 }
]

export const trafficData: ChartData[] = [
  { name: "Organic", value: 400 },
  { name: "Direct", value: 300 },
  { name: "Social", value: 300 },
  { name: "Referral", value: 200 },
  { name: "Paid", value: 100 }
]

export const campaignData: ChartData[] = [
  { name: "Facebook", clicks: 4000, impressions: 24000, ctr: 16.7 },
  { name: "Google Ads", clicks: 3000, impressions: 13980, ctr: 21.5 },
  { name: "Instagram", clicks: 2000, impressions: 9800, ctr: 20.4 },
  { name: "LinkedIn", clicks: 2780, impressions: 3908, ctr: 71.2 },
  { name: "Twitter", clicks: 1890, impressions: 4800, ctr: 39.4 }
]

export const tableData: TableData[] = [
  {
    id: "1",
    campaign: "Summer Sale Campaign",
    clicks: 15420,
    impressions: 245800,
    ctr: 6.27,
    spend: 12500,
    conversions: 1234,
    status: "active",
    date: "2024-01-15"
  },
  {
    id: "2",
    campaign: "Brand Awareness Q1",
    clicks: 8920,
    impressions: 156400,
    ctr: 5.70,
    spend: 8900,
    conversions: 892,
    status: "active",
    date: "2024-01-10"
  },
  {
    id: "3",
    campaign: "Holiday Special",
    clicks: 23410,
    impressions: 389200,
    ctr: 6.02,
    spend: 18900,
    conversions: 2100,
    status: "completed",
    date: "2023-12-20"
  },
  {
    id: "4",
    campaign: "Product Launch",
    clicks: 12340,
    impressions: 198600,
    ctr: 6.21,
    spend: 15600,
    conversions: 987,
    status: "paused",
    date: "2024-01-05"
  },
  {
    id: "5",
    campaign: "Email Newsletter",
    clicks: 5670,
    impressions: 89000,
    ctr: 6.37,
    spend: 3400,
    conversions: 456,
    status: "active",
    date: "2024-01-12"
  },
  {
    id: "6",
    campaign: "Social Media Boost",
    clicks: 8900,
    impressions: 145200,
    ctr: 6.13,
    spend: 6700,
    conversions: 678,
    status: "active",
    date: "2024-01-08"
  }
] 