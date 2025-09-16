import { Navigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "Get Current Time",
    id: "get_current_time",
    credits: 0,
    description: "Get the current time and date for any timezone around the world with detailed formatting options",
  },
  {
    name: "Convert Timezone",
    id: "convert_timezone",
    credits: 1,
    description: "Convert time between different timezones with automatic daylight saving time adjustments",
  },
  {
    name: "Get Date Info",
    id: "get_date_info",
    credits: 0,
    description:
      "Get detailed information about a specific date including day of week, week number, and calendar details",
  },
  {
    name: "Calculate Duration",
    id: "calculate_duration",
    credits: 1,
    description:
      "Calculate the duration between two dates or times with various output formats (days, hours, minutes, etc.)",
  },
]

export default function TimeDatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Time & Date</h1>
          <p className="text-slate-300 mb-4">Get current time and date information for any timezone around the world</p>

          <Breadcrumb />

          <Link
            href="/servers"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Servers</span>
          </Link>
        </div>

        {/* Version and Stats */}
        <div className="flex items-center space-x-4 mb-6">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            v0.0.3
          </Badge>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>🔧 4 Tools</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfigurationPanel />
          <div className="space-y-6">
            {/* Tools Panel */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <span>🔧</span>
                  <span>Available Tools</span>
                </CardTitle>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  4
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{tool.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">{tool.id}</span>
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {tool.credits === 0 ? "Free" : `${tool.credits} credits`}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{tool.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
