import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatPercentage } from "@/lib/utils"
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  BarChart3,
  TrendingDown
} from "lucide-react"
import { MetricCard as MetricCardType } from "@/lib/data"

interface MetricCardProps {
  metric: MetricCardType
}

const iconMap = {
  "dollar-sign": DollarSign,
  "users": Users,
  "trending-up": TrendingUp,
  "bar-chart-3": BarChart3,
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || BarChart3

  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 hover:border-primary/50 group cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {metric.title}
        </CardTitle>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-200">{metric.value}</div>
        <p className={cn(
          "text-xs flex items-center gap-1 mt-1 transition-all duration-200",
          metric.changeType === "increase" 
            ? "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" 
            : "text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300"
        )}>
          {metric.changeType === "increase" ? (
            <TrendingUp className="h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <TrendingDown className="h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
          )}
          {formatPercentage(metric.change)}
          <span className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200"> from last month</span>
        </p>
      </CardContent>
    </Card>
  )
} 