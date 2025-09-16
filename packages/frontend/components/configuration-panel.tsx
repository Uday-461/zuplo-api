"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"
import { useState } from "react"

export function ConfigurationPanel() {
  const [authMethod, setAuthMethod] = useState("oauth")
  const [apiKey, setApiKey] = useState("test2 - 5ef9f620...")
  const [transport, setTransport] = useState("sse")
  const [apiAuthMethod, setApiAuthMethod] = useState("header")

  const headerConfigCode = `{
  "mcpServers": {
    "mcp-collection": {
      "url": "https://www.mcp-collection.com/servers/[serverid]",
      "headers": {
        "Authorization": "Bearer 5ef9f620..."
      }
    }
  }
}`

  const parameterConfigCode = `{
  "mcpServers": {
    "mcp-collection": {
      "url": "https://www.mcp-collection.com/servers/[serverid]?api_key=5ef9f620..."
    }
  }
}`

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auth Method Selection */}
        <div className="flex space-x-4">
          <button
            onClick={() => setAuthMethod("oauth")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
              authMethod === "oauth" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${authMethod === "oauth" ? "bg-white" : "bg-slate-600"}`} />
            <span>OAuth 2.1</span>
          </button>
          <button
            onClick={() => setAuthMethod("api")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
              authMethod === "api" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${authMethod === "api" ? "bg-white" : "bg-slate-600"}`} />
            <span>API Key</span>
          </button>
        </div>

        {authMethod === "oauth" ? (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">OAuth 2.1 Setup</h3>
            <p className="text-slate-300 text-sm mb-4">
              Configure your MCP client (like Claude Desktop) with OAuth 2.1 authentication. The client will handle the
              authorization flow automatically when connecting.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">SSE (Server-Sent Events) URL</label>
                <div className="bg-slate-800 rounded-md p-3 font-mono text-sm text-slate-300">
                  https://www.mcp-collection.com/servers/ip-lookup/sse
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy SSE URL
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">MCP (Streamable HTTP) URL</label>
                <div className="bg-slate-800 rounded-md p-3 font-mono text-sm text-slate-300">
                  https://www.mcp-collection.com/servers/ip-lookup/mcp
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy MCP URL
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-amber-700 text-amber-100">
                Legacy
              </Badge>
              <h3 className="text-white font-medium">API Key Configuration</h3>
            </div>
            <p className="text-amber-200 text-sm mb-4">
              This method will be deprecated in future versions. Consider migrating to OAuth.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select API Key:</label>
                <Select value={apiKey} onValueChange={setApiKey}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="test2 - 5ef9f620...">test2 - 5ef9f620...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Transport:</label>
                <Select value={transport} onValueChange={setTransport}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="sse">SSE (Server-Sent Events)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-slate-400 text-xs mt-1">
                  Traditional streaming connection for real-time communication.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Authentication Method:</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setApiAuthMethod("header")}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      apiAuthMethod === "header"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Header
                  </button>
                  <button
                    onClick={() => setApiAuthMethod("parameter")}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      apiAuthMethod === "parameter"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    URL Parameter
                  </button>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  {apiAuthMethod === "header"
                    ? "Send API key in Authorization header (recommended)"
                    : "Include API key as URL parameter"}
                </p>
              </div>
            </div>
          </div>
        )}

        {authMethod === "api" && (
          <div>
            <h3 className="text-white font-medium mb-2">
              SSE Configuration with API Key ({apiAuthMethod === "header" ? "Header" : "Parameter"})
            </h3>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 relative">
              <pre className="whitespace-pre-wrap">
                {apiAuthMethod === "header" ? headerConfigCode : parameterConfigCode}
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Configuration
              </Button>
            </div>
            <div className="mt-3 p-3 bg-slate-800/50 rounded-md">
              <p className="text-slate-400 text-sm">
                {apiAuthMethod === "header" ? (
                  <>
                    <strong className="text-slate-300">Header Authentication:</strong> The API key is sent in the
                    Authorization header as a Bearer token. This is the recommended approach for security.
                  </>
                ) : (
                  <>
                    <strong className="text-slate-300">Parameter Authentication:</strong> The API key is included
                    directly in the URL as a query parameter. Less secure but simpler for testing.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
