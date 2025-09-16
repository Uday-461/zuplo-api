import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const prompts = [
  {
    name: "IP Location Summary",
    id: "ip_location_summary",
    description: "Get a quick location summary for an IP address with natural language response",
  },
]

export function PromptsPanel() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center space-x-2">
          <span>💬</span>
          <span>Available Prompts</span>
        </CardTitle>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          1
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">{prompt.name}</h3>
              <span className="text-xs text-slate-400">{prompt.id}</span>
            </div>
            <p className="text-slate-400 text-sm">{prompt.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
