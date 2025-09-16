import { Navigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "Analyze Building",
    id: "analyze_building",
    credits: 5,
    description:
      "Analyze a building's solar potential using Google Solar API with detailed insights about roof area, solar panels capacity, and energy generation estimates",
  },
  {
    name: "Get Solar Data",
    id: "get_solar_data",
    credits: 3,
    description:
      "Get comprehensive solar data for a specific location including solar irradiance, weather patterns, and optimal panel positioning",
  },
  {
    name: "Calculate Costs",
    id: "calculate_costs",
    credits: 4,
    description:
      "Calculate solar installation costs, potential savings, payback period, and return on investment based on location and energy usage",
  },
]

const prompts = [
  {
    name: "Solar Analysis Report",
    id: "solar_analysis_report",
    description: "Generate a comprehensive solar analysis report with recommendations for solar installation",
  },
]

export default function SolarResearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Solar Research</h1>
          <p className="text-slate-300 mb-4">
            Comprehensive solar energy analysis using Google Solar API with building insights, regional solar data, and
            cost calculations
          </p>

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
            v0.0.2
          </Badge>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>🔧 3 Tools</span>
            <span>💬 1 Prompts</span>
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
                  3
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
                          {tool.credits} credits
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{tool.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Prompts Panel */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <span>💬</span>
                  <span>Available Prompts</span>
                </CardTitle>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  1
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{prompt.name}</h3>
                      <span className="text-xs text-slate-400">{prompt.id}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{prompt.description}</p>
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
