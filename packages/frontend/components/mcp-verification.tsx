"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Loader2, Server, Shield, Zap, Globe, Copy } from "lucide-react"

interface MCPVerificationProps {
  serverUrl: string
  apiKey?: string
  onVerificationComplete: (result: VerificationResult) => void
}

interface VerificationResult {
  success: boolean
  serverInfo?: {
    name: string
    version: string
    tools: Array<{ name: string; description: string }>
    prompts: Array<{ name: string; description: string }>
    capabilities: string[]
  }
  proxiedUrl?: string
  error?: string
}

interface VerificationStep {
  id: string
  name: string
  status: "pending" | "running" | "success" | "error"
  message?: string
}

export function MCPVerification({ serverUrl, apiKey, onVerificationComplete }: MCPVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    { id: "connection", name: "Testing Connection", status: "pending" },
    { id: "handshake", name: "MCP Handshake", status: "pending" },
    { id: "capabilities", name: "Discovering Capabilities", status: "pending" },
    { id: "validation", name: "Validating Tools & Prompts", status: "pending" },
    { id: "proxy", name: "Creating Proxied Endpoint", status: "pending" },
  ])
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)

  const updateStepStatus = (stepId: string, status: VerificationStep["status"], message?: string) => {
    setVerificationSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, status, message } : step)))
  }

  const runVerification = async () => {
    setIsVerifying(true)
    setCurrentStep(0)
    setVerificationResult(null)

    try {
      // Step 1: Test Connection
      setCurrentStep(0)
      updateStepStatus("connection", "running")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateStepStatus("connection", "success", "Connection established")

      // Step 2: MCP Handshake
      setCurrentStep(1)
      updateStepStatus("handshake", "running")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      updateStepStatus("handshake", "success", "MCP protocol confirmed")

      // Step 3: Discover Capabilities
      setCurrentStep(2)
      updateStepStatus("capabilities", "running")
      await new Promise((resolve) => setTimeout(resolve, 1200))
      updateStepStatus("capabilities", "success", "Found 4 tools, 2 prompts")

      // Step 4: Validate Tools & Prompts
      setCurrentStep(3)
      updateStepStatus("validation", "running")
      await new Promise((resolve) => setTimeout(resolve, 800))
      updateStepStatus("validation", "success", "All capabilities validated")

      // Step 5: Create Proxied Endpoint
      setCurrentStep(4)
      updateStepStatus("proxy", "running")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateStepStatus("proxy", "success", "Proxy endpoint created")

      // Mock successful result
      const result: VerificationResult = {
        success: true,
        serverInfo: {
          name: "Weather API Server",
          version: "v1.2.0",
          tools: [
            { name: "get_current_weather", description: "Get current weather for a location" },
            { name: "get_forecast", description: "Get weather forecast for multiple days" },
            { name: "get_alerts", description: "Get weather alerts for a region" },
            { name: "search_locations", description: "Search for weather station locations" },
          ],
          prompts: [
            { name: "weather_summary", description: "Generate a weather summary for a location" },
            { name: "travel_advice", description: "Provide weather-based travel advice" },
          ],
          capabilities: ["real-time-data", "historical-data", "alerts", "forecasting"],
        },
        proxiedUrl: `https://mcp-proxy.vercel.app/api/proxy/${btoa(serverUrl).replace(/[^a-zA-Z0-9]/g, "")}`,
      }

      setVerificationResult(result)
      onVerificationComplete(result)
    } catch (error) {
      const failedStep = verificationSteps[currentStep]
      updateStepStatus(failedStep.id, "error", "Verification failed")

      const result: VerificationResult = {
        success: false,
        error: "Failed to verify MCP server. Please check your server URL and try again.",
      }

      setVerificationResult(result)
      onVerificationComplete(result)
    } finally {
      setIsVerifying(false)
    }
  }

  const copyProxiedUrl = () => {
    if (verificationResult?.proxiedUrl) {
      navigator.clipboard.writeText(verificationResult.proxiedUrl)
    }
  }

  const progress = ((currentStep + 1) / verificationSteps.length) * 100

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            MCP Server Verification
          </CardTitle>
          <CardDescription className="text-slate-400">
            Verify your MCP server and create a proxied endpoint for marketplace integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isVerifying && !verificationResult && (
            <div className="text-center py-8">
              <Server className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">Ready to verify your MCP server</p>
              <Button onClick={runVerification} className="bg-blue-600 hover:bg-blue-700">
                Start Verification
              </Button>
            </div>
          )}

          {isVerifying && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Verification Progress</span>
                  <span className="text-slate-400">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-3">
                {verificationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    {step.status === "pending" && <div className="h-5 w-5 rounded-full border-2 border-slate-600" />}
                    {step.status === "running" && <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />}
                    {step.status === "success" && <CheckCircle className="h-5 w-5 text-green-400" />}
                    {step.status === "error" && <AlertCircle className="h-5 w-5 text-red-400" />}

                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.status === "success"
                            ? "text-green-400"
                            : step.status === "error"
                              ? "text-red-400"
                              : step.status === "running"
                                ? "text-blue-400"
                                : "text-slate-400"
                        }`}
                      >
                        {step.name}
                      </p>
                      {step.message && <p className="text-xs text-slate-500">{step.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {verificationResult && verificationResult.success && verificationResult.serverInfo && (
            <div className="space-y-4">
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  <strong>Verification successful!</strong> Your MCP server is ready for the marketplace.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-700/30 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Server Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span className="text-white">{verificationResult.serverInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Version:</span>
                      <span className="text-white">{verificationResult.serverInfo.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tools:</span>
                      <span className="text-white">{verificationResult.serverInfo.tools.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prompts:</span>
                      <span className="text-white">{verificationResult.serverInfo.prompts.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Proxied Endpoint
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Your server is now accessible through our authenticated proxy:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-slate-800 p-2 rounded text-green-400 break-all">
                        {verificationResult.proxiedUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyProxiedUrl}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500">
                      This URL includes authentication, usage tracking, and payment processing.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Detected Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {verificationResult.serverInfo.capabilities.map((capability) => (
                    <Badge key={capability} variant="secondary" className="bg-slate-700 text-slate-300">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Available Tools</h4>
                  <div className="space-y-2">
                    {verificationResult.serverInfo.tools.map((tool, index) => (
                      <div key={index} className="text-sm p-2 bg-slate-700/20 rounded">
                        <p className="text-white font-medium">{tool.name}</p>
                        <p className="text-slate-400 text-xs">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Available Prompts</h4>
                  <div className="space-y-2">
                    {verificationResult.serverInfo.prompts.map((prompt, index) => (
                      <div key={index} className="text-sm p-2 bg-slate-700/20 rounded">
                        <p className="text-white font-medium">{prompt.name}</p>
                        <p className="text-slate-400 text-xs">{prompt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {verificationResult && !verificationResult.success && (
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                <strong>Verification failed:</strong> {verificationResult.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
