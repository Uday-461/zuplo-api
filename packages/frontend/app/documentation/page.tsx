import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Check, ChevronDown } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-slate-300">
            Complete guide to using MCP Collection and integrating Model Context Protocol servers.
          </p>
        </div>

        {/* Quick Start Section */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <span>Quick Start</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">
              Get up and running with MCP Collection in minutes. Follow these steps to start using our Model Context
              Protocol servers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-white font-semibold mb-2">Create Account</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Sign up for a free account to access our MCP servers and manage your usage.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  Get Started
                </Button>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-white font-semibold mb-2">Choose Authentication</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Set up OAuth 2.1 (recommended) or create API keys for server access.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  Manage Auth
                </Button>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-white font-semibold mb-2">Configure Client</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Add server URLs to your MCP client (Claude, ChatGPT, Cline, etc.) and start using tools.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  Browse Servers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Section */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span>Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-blue-600 text-white">Recommended</Badge>
              <h3 className="text-white font-semibold">OAuth 2.1 with PKCE</h3>
            </div>

            <p className="text-slate-300 mb-6">
              Modern, secure authentication that doesn't require managing long-lived tokens. Perfect for all MCP clients
              and recommended for production use.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Example */}
              <div>
                <h4 className="text-white font-medium mb-3">Configuration Example:</h4>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 relative">
                  <pre className="whitespace-pre-wrap">{`{
  "mcpServers": {
    "mcp-collection": {
      "url": "https://mcp-collection.com/servers/[serverid]"
    }
  }
}`}</pre>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  That's it! OAuth authentication will be handled automatically by your MCP client.
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-white font-medium mb-3">Key Benefits:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300 text-sm">No long-lived tokens to manage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300 text-sm">Automatic token refresh</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300 text-sm">Granular permissions with scopes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300 text-sm">Industry-standard security</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative API Keys Section */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <span>Alternative: API Keys</span>
                <Badge variant="secondary" className="bg-amber-700 text-amber-100">
                  Legacy
                </Badge>
              </CardTitle>
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm">
              API key authentication is still supported but will be deprecated in future versions. We recommend
              migrating to OAuth 2.1 for better security and user experience.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
