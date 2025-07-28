import { Header } from "@/components/Header"
import { MetricCard } from "@/components/MetricCard"
import { RevenueChart } from "@/components/RevenueChart"
import { TrafficChart } from "@/components/TrafficChart"
import { CampaignChart } from "@/components/CampaignChart"
import { DataTable } from "@/components/DataTable"
import { metricsData } from "@/lib/data"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center transition-all duration-200 hover:scale-[1.01]">
          <h2 className="text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-200 cursor-pointer mb-2">
            Dashboard
          </h2>
          <p className="text-muted-foreground hover:text-foreground transition-colors duration-200 max-w-2xl mx-auto">
            Welcome to your analytics dashboard. Here's an overview of your performance.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metricsData.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <RevenueChart />
          <TrafficChart />
          <CampaignChart />
        </div>

        {/* Data Table */}
        <DataTable />
      </main>
    </div>
  )
}
