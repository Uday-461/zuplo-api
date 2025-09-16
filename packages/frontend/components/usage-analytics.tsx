"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Zap, DollarSign, TrendingUp, Clock, Globe, Activity } from "lucide-react"

interface UsageData {
  serverId: string
  serverName: string
  totalRequests: number
  uniqueUsers: number
  revenue: number
  avgResponseTime: number
  successRate: number
  topUsers: Array<{
    userId: string
    username: string
    requests: number
    lastUsed: string
  }>
  requestsByDay: Array<{
    date: string
    requests: number
    revenue: number
  }>
  toolUsage: Array<{
    toolName: string
    usage: number
    percentage: number
  }>
}

interface UsageAnalyticsProps {
  data: UsageData
}

export function UsageAnalytics({ data }: UsageAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-white">{data.totalRequests.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Unique Users</p>
                <p className="text-2xl font-bold text-white">{data.uniqueUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-white">${data.revenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">{data.successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool Usage */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Tool Usage
            </CardTitle>
            <CardDescription className="text-slate-400">Most popular tools in your server</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.toolUsage.map((tool, index) => (
              <div key={tool.toolName} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-medium">{tool.toolName}</span>
                  <span className="text-slate-400">{tool.usage} calls</span>
                </div>
                <Progress value={tool.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Users
            </CardTitle>
            <CardDescription className="text-slate-400">Users with the most API calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topUsers.map((user, index) => (
                <div key={user.userId} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.username}</p>
                      <p className="text-slate-400 text-xs">Last used {user.lastUsed}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    {user.requests} calls
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription className="text-slate-400">Server performance and reliability statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{data.avgResponseTime}ms</p>
              <p className="text-slate-400 text-sm">Avg Response Time</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{data.successRate}%</p>
              <p className="text-slate-400 text-sm">Success Rate</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-slate-400 text-sm">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-slate-400">Last 7 days of usage data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.requestsByDay.slice(-7).map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{day.date}</p>
                  <p className="text-slate-400 text-xs">{day.requests} requests</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">${day.revenue.toFixed(2)}</p>
                  <p className="text-slate-400 text-xs">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
