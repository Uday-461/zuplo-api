import { Navigation } from "@/components/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Weather</h1>
          <p className="text-slate-300 mb-4">
            Professional weather data with current conditions, forecasts, and weather alerts using comprehensive
            meteorological APIs
          </p>

          <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/servers" className="hover:text-blue-400 transition-colors">
              MCP Servers
            </Link>
            <span>›</span>
            <span className="text-slate-300">Weather</span>
          </nav>

          <Link
            href="/servers"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Servers</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            v0.0.1
          </Badge>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>🔧 6 Tools</span>
            <span>💬 1 Prompts</span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Weather Server Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              This server provides comprehensive weather data including current conditions, forecasts, and alerts.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300">
              <pre>{`{
  "mcpServers": {
    "weather": {
      "url": "https://www.mcp-collection.com/servers/weather"
    }
  }
}`}</pre>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
