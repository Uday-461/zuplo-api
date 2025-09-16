"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, AlertCircle, Loader2, Server, Hash, X } from "lucide-react"

interface ServerInfo {
  name: string
  description: string
  version: string
  tools: Array<{
    name: string
    description: string
    price?: number // Added price field for individual tool pricing
  }>
  prompts: Array<{
    name: string
    description: string
  }>
}

export function ServerSubmissionForm() {
  const [formData, setFormData] = useState({
    serverName: "",
    serverUrl: "",
    apiKey: "",
    hashtags: [] as string[], // Replaced category with hashtags array
    description: "",
    requiresAuth: false,
    documentation: "",
    supportEmail: "",
  })

  const [hashtagInput, setHashtagInput] = useState("")
  const [toolPricing, setToolPricing] = useState<Record<string, number>>({}) // Added tool pricing state

  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle")
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null)
  const [verificationError, setVerificationError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addHashtag = (hashtag: string) => {
    const cleanTag = hashtag.trim().toLowerCase().replace(/^#/, "")
    if (cleanTag && !formData.hashtags.includes(cleanTag)) {
      handleInputChange("hashtags", [...formData.hashtags, cleanTag])
    }
  }

  const removeHashtag = (hashtag: string) => {
    handleInputChange(
      "hashtags",
      formData.hashtags.filter((tag) => tag !== hashtag),
    )
  }

  const handleHashtagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (hashtagInput.trim()) {
        addHashtag(hashtagInput)
        setHashtagInput("")
      }
    }
  }

  const handleToolPriceChange = (toolName: string, price: string) => {
    const numPrice = Number.parseInt(price) || 0
    setToolPricing((prev) => ({ ...prev, [toolName]: numPrice }))
  }

  const handleVerifyServer = async () => {
    if (!formData.serverUrl) {
      setVerificationError("Server URL is required")
      return
    }

    setVerificationStatus("verifying")
    setVerificationError("")

    // Simulate MCP handshake
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockServerInfo: ServerInfo = {
        name: formData.serverName || "Detected Server",
        description: "Auto-detected server description from MCP handshake",
        version: "v1.0.0",
        tools: [
          { name: "get_weather", description: "Get current weather data for any location", price: 1 },
          { name: "get_forecast", description: "Get weather forecast for up to 7 days", price: 2 },
          { name: "get_alerts", description: "Get weather alerts and warnings", price: 1 },
          { name: "historical_data", description: "Access historical weather data", price: 3 },
        ],
        prompts: [
          { name: "weather_summary", description: "Generate weather summary for location" },
          { name: "travel_advice", description: "Provide weather-based travel recommendations" },
        ],
      }

      setServerInfo(mockServerInfo)
      setVerificationStatus("success")

      const initialPricing: Record<string, number> = {}
      mockServerInfo.tools.forEach((tool) => {
        if (tool.price) {
          initialPricing[tool.name] = tool.price
        }
      })
      setToolPricing(initialPricing)

      // Auto-fill form with detected info
      if (!formData.serverName) {
        handleInputChange("serverName", mockServerInfo.name)
      }
      if (!formData.description) {
        handleInputChange("description", mockServerInfo.description)
      }
    } catch (error) {
      setVerificationStatus("error")
      setVerificationError("Failed to connect to MCP server. Please check the URL and try again.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationStatus !== "success") {
      setVerificationError("Please verify your server before submitting")
      return
    }

    setIsSubmitting(true)

    // Simulate submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form on success
      setFormData({
        serverName: "",
        serverUrl: "",
        apiKey: "",
        hashtags: [],
        description: "",
        requiresAuth: false,
        documentation: "",
        supportEmail: "",
      })
      setHashtagInput("")
      setToolPricing({})
      setServerInfo(null)
      setVerificationStatus("idle")

      alert("Server submitted successfully! It will be reviewed within 24-48 hours.")
    } catch (error) {
      alert("Failed to submit server. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Server className="h-5 w-5" />
            Submit New MCP Server
          </CardTitle>
          <CardDescription className="text-slate-400">
            Add your Model Context Protocol server to the marketplace. Pricing is based on individual tools detected
            during verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Server Connection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Server Connection</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serverName" className="text-slate-300">
                    Server Name
                  </Label>
                  <Input
                    id="serverName"
                    value={formData.serverName}
                    onChange={(e) => handleInputChange("serverName", e.target.value)}
                    placeholder="My Awesome MCP Server"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hashtags" className="text-slate-300 flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    Hashtags
                  </Label>
                  <Input
                    id="hashtags"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={handleHashtagKeyPress}
                    placeholder="weather, api, data (press Enter or comma to add)"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {formData.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-600/30"
                        >
                          #{tag}
                          <button type="button" onClick={() => removeHashtag(tag)} className="hover:text-blue-100">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serverUrl" className="text-slate-300">
                  Server URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="serverUrl"
                    value={formData.serverUrl}
                    onChange={(e) => handleInputChange("serverUrl", e.target.value)}
                    placeholder="https://your-server.com/mcp"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyServer}
                    disabled={!formData.serverUrl || verificationStatus === "verifying"}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
                  >
                    {verificationStatus === "verifying" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying
                      </>
                    ) : (
                      "Verify MCP"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-slate-300">
                  API Key (Optional)
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  placeholder="Enter API key if required"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400">Only required if your server needs authentication</p>
              </div>

              {/* Verification Status */}
              {verificationStatus === "success" && serverInfo && (
                <Alert className="border-green-500/30 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">
                    <strong>Server verified successfully!</strong>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        Detected {serverInfo.tools.length} tools and {serverInfo.prompts.length} prompts
                      </p>
                      <p>Version: {serverInfo.version}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {verificationStatus === "error" && (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">{verificationError}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Server Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Server Details</h3>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what your server does and its key features..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentation" className="text-slate-300">
                    Documentation URL
                  </Label>
                  <Input
                    id="documentation"
                    value={formData.documentation}
                    onChange={(e) => handleInputChange("documentation", e.target.value)}
                    placeholder="https://docs.your-server.com"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail" className="text-slate-300">
                    Support Email
                  </Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                    placeholder="support@your-server.com"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresAuth"
                  checked={formData.requiresAuth}
                  onCheckedChange={(checked) => handleInputChange("requiresAuth", checked as boolean)}
                  className="border-slate-600 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="requiresAuth" className="text-slate-300 text-sm">
                  This server requires authentication
                </Label>
              </div>
            </div>

            {serverInfo && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Detected Capabilities & Pricing</h3>

                <div className="grid grid-cols-1 gap-4">
                  <Card className="bg-slate-700/30 border-slate-600">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">
                        Tools ({serverInfo.tools.length}) - Set Credit Pricing
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs">
                        Each tool can have individual pricing in credits (integers only)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {serverInfo.tools.map((tool, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-white font-medium">{tool.name}</p>
                            <p className="text-slate-400 text-xs">{tool.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Input
                              type="number"
                              min="0"
                              step="1"
                              value={toolPricing[tool.name] || 0}
                              onChange={(e) => handleToolPriceChange(tool.name, e.target.value)}
                              className="w-20 bg-slate-700 border-slate-600 text-white text-center"
                              placeholder="0"
                            />
                            <span className="text-slate-400 text-sm">credits</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/30 border-slate-600">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">Prompts ({serverInfo.prompts.length})</CardTitle>
                      <CardDescription className="text-slate-400 text-xs">
                        Prompts are included free with tool usage
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {serverInfo.prompts.map((prompt, index) => (
                        <div key={index} className="text-sm p-2 bg-slate-800/30 rounded">
                          <p className="text-white font-medium">{prompt.name}</p>
                          <p className="text-slate-400 text-xs">{prompt.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={verificationStatus !== "success" || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Server"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
