"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, TrendingUp, Clock, Server, Wrench } from "lucide-react"

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Credits & Usage</h1>
          <p className="mt-2 text-slate-400">Monitor your credit usage and manage your subscription.</p>
        </div>

        {/* Your Plan Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Plan</h2>
          <p className="text-slate-400 mb-6">Manage your current plan and explore upgrade options.</p>

          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-white">Free Plan</h3>
                    <p className="text-sm text-slate-400">500 credits/month • Basic access</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                  Current Plan
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Unlock Premium Features</h3>
                  <p className="text-slate-400">Get more credits, priority support, and advanced analytics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>Up to 50,000 credits/month</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>No rate limits</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  View All Plans
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 flex-1 bg-transparent"
                >
                  Manage Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Plans */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Popular Plans</h2>
            <p className="text-slate-400">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Hobby Plan */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="h-5 w-5 text-slate-400" />
                  <div>
                    <h3 className="font-semibold text-white">Hobby</h3>
                    <p className="text-sm text-slate-400">Great for personal projects</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">$10</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">2,000 credits included</p>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  Get Started →
                </Button>
              </CardContent>
            </Card>

            {/* Startup Plan */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700/50 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                Most Popular
              </Badge>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Startup</h3>
                    <p className="text-sm text-slate-400">Ideal for growing teams</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">$30</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">10,000 credits included</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get Started →</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Credit Usage */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Credit Usage</h2>
          <p className="text-slate-400 mb-6">Track your monthly credit usage and consumption patterns.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-300">Monthly Allowance</h3>
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500</div>
                <p className="text-sm text-slate-400">Free Plan</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-300">Used This Month</h3>
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <p className="text-sm text-slate-400">0.0% of monthly allowance</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-300">Remaining</h3>
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500</div>
                <p className="text-sm text-slate-400">Available for this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Usage Analytics */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-slate-400" />
                  <CardTitle className="text-white">Usage Analytics</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-slate-400">Time Range:</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-slate-800 border-slate-700 text-white">
                      7 days
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      30 days
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      90 days
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2 p-4 bg-slate-800/50 rounded-lg">
                  <Wrench className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-300">Usage by Tool</span>
                </div>
                <div className="flex items-center space-x-2 p-4 bg-slate-800/50 rounded-lg">
                  <Server className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-300">Usage by Server</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Usage History */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-white">Recent Usage History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-400">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent usage to display</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
