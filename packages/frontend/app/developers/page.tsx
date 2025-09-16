"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Server, BarChart3, DollarSign, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { ServerSubmissionForm } from "@/components/server-submission-form"

// Mock data for developer dashboard
const myServers = [
  {
    id: "weather-pro",
    name: "Weather Pro",
    status: "active",
    version: "v1.2.0",
    downloads: 1250,
    revenue: 450.0,
    rating: 4.8,
    lastUpdated: "2 days ago",
  },
  {
    id: "crypto-tracker",
    name: "Crypto Tracker",
    status: "pending",
    version: "v0.1.0",
    downloads: 0,
    revenue: 0,
    rating: 0,
    lastUpdated: "1 week ago",
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    status: "rejected",
    version: "v0.5.0",
    downloads: 0,
    revenue: 0,
    rating: 0,
    lastUpdated: "3 weeks ago",
  },
]

const stats = {
  totalServers: 3,
  activeServers: 1,
  totalDownloads: 1250,
  totalRevenue: 450.0,
  avgRating: 4.8,
}

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Developer Portal</h1>
          <p className="text-slate-300">Manage your MCP servers, track performance, and grow your revenue.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-slate-700">
              My Servers
            </TabsTrigger>
            <TabsTrigger value="submit" className="data-[state=active]:bg-slate-700">
              Submit Server
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Servers</p>
                      <p className="text-2xl font-bold text-white">{stats.totalServers}</p>
                    </div>
                    <Server className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Servers</p>
                      <p className="text-2xl font-bold text-white">{stats.activeServers}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Downloads</p>
                      <p className="text-2xl font-bold text-white">{stats.totalDownloads.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Avg Rating</p>
                      <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">Latest updates on your servers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white text-sm">Weather Pro server approved and published</p>
                      <p className="text-slate-400 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-white text-sm">Crypto Tracker server under review</p>
                      <p className="text-slate-400 text-xs">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-white text-sm">AI Assistant server rejected - API documentation required</p>
                      <p className="text-slate-400 text-xs">3 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="servers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">My Servers</h2>
              <Button onClick={() => setActiveTab("submit")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Server
              </Button>
            </div>

            <div className="grid gap-4">
              {myServers.map((server) => (
                <Card key={server.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{server.name}</h3>
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            {server.version}
                          </Badge>
                          <Badge className={getStatusColor(server.status)}>
                            {getStatusIcon(server.status)}
                            <span className="ml-1 capitalize">{server.status}</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Downloads</p>
                            <p className="text-white font-medium">{server.downloads.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Revenue</p>
                            <p className="text-white font-medium">${server.revenue.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Rating</p>
                            <p className="text-white font-medium">{server.rating > 0 ? server.rating : "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Last Updated</p>
                            <p className="text-white font-medium">{server.lastUpdated}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <ServerSubmissionForm />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Analytics Dashboard</CardTitle>
                <CardDescription className="text-slate-400">
                  Detailed analytics and insights for your servers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Analytics dashboard coming soon</p>
                  <p className="text-slate-500 text-sm">Track downloads, usage patterns, and revenue trends</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
