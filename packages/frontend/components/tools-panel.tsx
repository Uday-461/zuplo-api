import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tools = [
  {
    name: "Lookup IP Address",
    id: "lookup_ip_address",
    credits: 3,
    description:
      "Get comprehensive geolocation and network information for any IP address including location, ISP, timezone, currency, and security assessment",
  },
  {
    name: "Bulk IP Lookup",
    id: "bulk_ip_lookup",
    credits: 8,
    description:
      "Lookup multiple IP addresses at once and get a summary comparison of their locations and network information",
  },
  {
    name: "Get Specific IP Field",
    id: "get_ip_field",
    credits: 2,
    description: "Get a specific field (like country, city, timezone) for an IP address or your current IP",
  },
  {
    name: "Analyze IP Geography",
    id: "analyze_ip_geography",
    credits: 12,
    description:
      "Analyze the geographic distribution of multiple IP addresses and provide statistical insights about countries, organizations, and security patterns",
  },
]

export function ToolsPanel() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center space-x-2">
          <span>🔧</span>
          <span>Available Tools</span>
        </CardTitle>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          4
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.id} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/30 transition-colors">
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
  )
}
