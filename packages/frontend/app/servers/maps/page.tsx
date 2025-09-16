import { Navigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "Geocode Address",
    id: "geocode_address",
    credits: 1,
    description: "Convert addresses to coordinates and vice versa with high accuracy geocoding",
  },
  {
    name: "Search Places",
    id: "search_places",
    credits: 2,
    description: "Search for places, businesses, and points of interest with detailed information and ratings",
  },
  {
    name: "Get Directions",
    id: "get_directions",
    credits: 3,
    description: "Get turn-by-turn directions between locations with multiple route options and traffic data",
  },
  {
    name: "Calculate Distance",
    id: "calculate_distance",
    credits: 1,
    description: "Calculate distance and travel time between multiple locations with various transportation modes",
  },
  {
    name: "Get Elevation",
    id: "get_elevation",
    credits: 2,
    description: "Get elevation data for specific coordinates or along a path with detailed topographic information",
  },
  {
    name: "Find Nearby",
    id: "find_nearby",
    credits: 2,
    description: "Find nearby places of interest, businesses, or services within a specified radius",
  },
  {
    name: "Get Street View",
    id: "get_street_view",
    credits: 4,
    description: "Get street view imagery and metadata for specific locations with panoramic views",
  },
]

const prompts = [
  {
    name: "Location Assistant",
    id: "location_assistant",
    description: "Get intelligent location-based recommendations and travel assistance",
  },
  {
    name: "Route Planner",
    id: "route_planner",
    description: "Plan optimal routes with multiple stops and transportation preferences",
  },
  {
    name: "Place Explorer",
    id: "place_explorer",
    description: "Explore and discover interesting places and attractions in any area",
  },
]

export default function MapsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Maps</h1>
          <p className="text-slate-300 mb-4">
            Comprehensive Maps integration with geocoding, places search, directions, and distance calculations
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
            <span>🔧 7 Tools</span>
            <span>💬 3 Prompts</span>
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
                  7
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
                  3
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
