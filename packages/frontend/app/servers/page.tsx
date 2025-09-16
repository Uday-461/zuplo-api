"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ServerCard } from "@/components/server-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid, List, Hash, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const servers = [
  {
    id: "ip-lookup",
    name: "IP Lookup",
    version: "v0.0.1",
    description:
      "Comprehensive IP address geolocation and information lookup. Get location, ISP, timezone, currency, and network details for any IP address",
    tools: [
      { name: "lookup_ip", price: 1 },
      { name: "get_location", price: 1 },
      { name: "get_isp_info", price: 2 },
      { name: "get_network_details", price: 2 },
    ],
    prompts: 1,
    href: "/servers/ip-lookup",
    hashtags: ["geolocation", "networking", "security", "ip", "lookup"],
    rating: 4.8,
    downloads: 1250,
    author: "MCP Team",
  },
  {
    id: "solar-research",
    name: "Solar Research",
    version: "v0.0.2",
    description:
      "Comprehensive solar energy analysis using Google Solar API with building insights, regional solar data, and cost calculations",
    tools: [
      { name: "analyze_building", price: 5 },
      { name: "get_solar_data", price: 3 },
      { name: "calculate_costs", price: 4 },
    ],
    prompts: 1,
    href: "/servers/solar-research",
    hashtags: ["solar", "energy", "sustainability", "green", "analysis"],
    rating: 4.6,
    downloads: 890,
    author: "EcoTech Labs",
  },
  {
    id: "finance",
    name: "Finance",
    version: "v0.0.1",
    description: "Real-time stock market data, company profiles, financial news, and market analysis",
    tools: [
      { name: "get_stock_price", price: 2 },
      { name: "get_company_profile", price: 3 },
      { name: "get_market_news", price: 1 },
      { name: "analyze_portfolio", price: 5 },
    ],
    prompts: 0,
    href: "/servers/finance",
    hashtags: ["stocks", "market", "trading", "finance", "investment"],
    rating: 4.9,
    downloads: 2100,
    author: "FinTech Solutions",
  },
  {
    id: "time-date",
    name: "Time & Date",
    version: "v0.0.3",
    description: "Get current time and date information for any timezone around the world",
    tools: [
      { name: "get_current_time", price: 0 },
      { name: "convert_timezone", price: 1 },
      { name: "get_date_info", price: 0 },
      { name: "calculate_duration", price: 1 },
    ],
    prompts: 0,
    href: "/servers/time-date",
    hashtags: ["time", "timezone", "calendar", "date", "utilities"],
    rating: 4.7,
    downloads: 1800,
    author: "TimeZone Inc",
  },
  {
    id: "ev-charging",
    name: "EV Charging and Routes",
    version: "v0.0.1",
    description:
      "Comprehensive electric vehicle tools for finding charging stations and planning EV routes using real-time data",
    tools: [
      { name: "find_charging_stations", price: 3 },
      { name: "plan_ev_route", price: 5 },
      { name: "check_station_status", price: 2 },
      { name: "calculate_charging_cost", price: 2 },
    ],
    prompts: 1,
    href: "/servers/ev-charging",
    hashtags: ["electric", "charging", "routes", "ev", "transportation"],
    rating: 4.5,
    downloads: 650,
    author: "EV Solutions",
  },
  {
    id: "maps",
    name: "Maps",
    version: "v0.0.2",
    description: "Comprehensive Maps integration with geocoding, places search, directions, and distance calculations",
    tools: [
      { name: "geocode_address", price: 1 },
      { name: "search_places", price: 2 },
      { name: "get_directions", price: 3 },
      { name: "calculate_distance", price: 1 },
      { name: "get_elevation", price: 2 },
      { name: "find_nearby", price: 2 },
      { name: "get_street_view", price: 4 },
    ],
    prompts: 3,
    href: "/servers/maps",
    hashtags: ["maps", "geocoding", "directions", "location", "navigation"],
    rating: 4.8,
    downloads: 3200,
    author: "MapTech",
  },
  {
    id: "weather",
    name: "Weather",
    version: "v0.0.1",
    description:
      "Professional weather data with current conditions, forecasts, and weather alerts using comprehensive meteorological APIs",
    tools: [
      { name: "get_current_weather", price: 1 },
      { name: "get_forecast", price: 2 },
      { name: "get_weather_alerts", price: 1 },
      { name: "get_historical_data", price: 3 },
      { name: "get_air_quality", price: 2 },
      { name: "get_uv_index", price: 1 },
    ],
    prompts: 1,
    href: "/servers/weather",
    hashtags: ["weather", "forecast", "alerts", "climate", "meteorology"],
    rating: 4.6,
    downloads: 1950,
    author: "WeatherPro",
  },
]

const getAllHashtags = () => {
  const hashtagSet = new Set<string>()
  servers.forEach((server) => {
    server.hashtags.forEach((tag) => hashtagSet.add(tag))
  })
  return Array.from(hashtagSet).sort()
}

const pricingOptions = ["All", "Free Tools", "Paid Tools", "Mixed"]

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]) // Changed from single category to multiple hashtags
  const [selectedPricing, setSelectedPricing] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const addHashtagFilter = (hashtag: string) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag])
    }
  }

  const removeHashtagFilter = (hashtag: string) => {
    setSelectedHashtags(selectedHashtags.filter((tag) => tag !== hashtag))
  }

  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.hashtags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesHashtags =
      selectedHashtags.length === 0 ||
      selectedHashtags.every((selectedTag) =>
        server.hashtags.some((serverTag) => serverTag.toLowerCase().includes(selectedTag.toLowerCase())),
      )

    const matchesPricing = (() => {
      if (selectedPricing === "All") return true
      const hasFreeTool = server.tools.some((tool) => tool.price === 0)
      const hasPaidTool = server.tools.some((tool) => tool.price > 0)

      switch (selectedPricing) {
        case "Free Tools":
          return hasFreeTool && !hasPaidTool
        case "Paid Tools":
          return hasPaidTool && !hasFreeTool
        case "Mixed":
          return hasFreeTool && hasPaidTool
        default:
          return true
      }
    })()

    return matchesSearch && matchesHashtags && matchesPricing
  })

  const sortedServers = [...filteredServers].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.version.localeCompare(a.version)
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        const aMinPrice = Math.min(...a.tools.map((t) => t.price))
        const bMinPrice = Math.min(...b.tools.map((t) => t.price))
        return aMinPrice - bMinPrice
      case "price-high":
        const aMaxPrice = Math.max(...a.tools.map((t) => t.price))
        const bMaxPrice = Math.max(...b.tools.map((t) => t.price))
        return bMaxPrice - aMaxPrice
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">MCP Server Marketplace</h1>
          <p className="text-slate-300">
            Discover, integrate, and use Model Context Protocol servers. Pricing based on individual tool usage.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search servers, tools, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-300 text-sm flex items-center gap-1">
                <Hash className="h-4 w-4" />
                Popular hashtags:
              </span>
              {getAllHashtags()
                .slice(0, 10)
                .map((hashtag) => (
                  <button
                    key={hashtag}
                    onClick={() => addHashtagFilter(hashtag)}
                    disabled={selectedHashtags.includes(hashtag)}
                    className="px-2 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-md border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    #{hashtag}
                  </button>
                ))}
            </div>

            {selectedHashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-slate-300 text-sm">Active filters:</span>
                {selectedHashtags.map((hashtag) => (
                  <span
                    key={hashtag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-600/30"
                  >
                    #{hashtag}
                    <button onClick={() => removeHashtagFilter(hashtag)} className="hover:text-blue-100">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedHashtags([])}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                <SelectTrigger className="w-36 bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {pricingOptions.map((pricing) => (
                    <SelectItem key={pricing} value={pricing} className="text-white hover:bg-slate-700">
                      {pricing}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="popular" className="text-white hover:bg-slate-700">
                    Most Popular
                  </SelectItem>
                  <SelectItem value="rating" className="text-white hover:bg-slate-700">
                    Highest Rated
                  </SelectItem>
                  <SelectItem value="newest" className="text-white hover:bg-slate-700">
                    Newest
                  </SelectItem>
                  <SelectItem value="name" className="text-white hover:bg-slate-700">
                    Name A-Z
                  </SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-slate-700">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-slate-700">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-slate-400">
            Showing {sortedServers.length} of {servers.length} servers
          </p>
        </div>

        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedServers.map((server) => (
            <ServerCard key={server.id} server={server} viewMode={viewMode} />
          ))}
        </div>

        {sortedServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No servers found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedHashtags([])
                setSelectedPricing("All")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
