import { Navigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { ToolsPanel } from "@/components/tools-panel"
import { PromptsPanel } from "@/components/prompts-panel"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function IPLookupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">IP Lookup</h1>
          <p className="text-slate-300 mb-4">
            Comprehensive IP address geolocation and information lookup. Get location, ISP, timezone, currency, and
            network details for any IP address
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
            v0.0.1
          </Badge>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>🔧 4 Tools</span>
            <span>💬 1 Prompts</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfigurationPanel />
          <div className="space-y-6">
            <ToolsPanel />
            <PromptsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
