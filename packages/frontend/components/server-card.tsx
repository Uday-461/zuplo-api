import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, MessageSquare, Star, Download, User, Hash, Coins } from "lucide-react"

interface Tool {
  name: string
  price: number
}

interface Server {
  id: string
  name: string
  version: string
  description: string
  tools: Tool[] // Updated to include individual tool pricing
  prompts: number
  href: string
  hashtags: string[] // Changed from category and tags to hashtags
  rating: number
  downloads: number
  author: string
}

interface ServerCardProps {
  server: Server
  viewMode?: "grid" | "list"
}

export function ServerCard({ server, viewMode = "grid" }: ServerCardProps) {
  const toolPrices = server.tools.map((tool) => tool.price)
  const minPrice = Math.min(...toolPrices)
  const maxPrice = Math.max(...toolPrices)
  const hasFreeTool = toolPrices.some((price) => price === 0)
  const hasPaidTool = toolPrices.some((price) => price > 0)

  const getPricingDisplay = () => {
    if (hasFreeTool && !hasPaidTool) return "Free"
    if (!hasFreeTool && hasPaidTool) {
      return minPrice === maxPrice ? `${minPrice} credits` : `${minPrice}-${maxPrice} credits`
    }
    return `Free + ${minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`} credits`
  }

  const getPricingBadgeVariant = () => {
    if (hasFreeTool && !hasPaidTool) return "default"
    if (!hasFreeTool && hasPaidTool) return "destructive"
    return "secondary"
  }

  if (viewMode === "list") {
    return (
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link href={server.href}>
                  <CardTitle className="text-white hover:text-blue-400 transition-colors cursor-pointer text-lg">
                    {server.name}
                  </CardTitle>
                </Link>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                  {server.version}
                </Badge>
                <Badge variant={getPricingBadgeVariant()} className="text-xs">
                  {getPricingDisplay()}
                </Badge>
              </div>

              <CardDescription className="text-slate-400 text-sm leading-relaxed mb-3">
                {server.description}
              </CardDescription>

              <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{server.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{server.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{server.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wrench className="h-4 w-4" />
                  <span>{server.tools.length} Tools</span>
                </div>
                {server.prompts > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{server.prompts} Prompts</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {server.hashtags.slice(0, 4).map((hashtag) => (
                  <Badge key={hashtag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                    #{hashtag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="ml-4">
              <Link href={server.href}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={server.href}>
      <Card className="h-full bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-white group-hover:text-blue-400 transition-colors text-lg">
              {server.name}
            </CardTitle>
            <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
              {server.version}
            </Badge>
          </div>

          <div className="flex items-center justify-between mb-2">
            <Badge variant={getPricingBadgeVariant()} className="text-xs flex items-center gap-1">
              <Coins className="h-3 w-3" />
              {getPricingDisplay()}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{server.rating}</span>
            </div>
          </div>

          <CardDescription className="text-slate-400 text-sm leading-relaxed line-clamp-3">
            {server.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{server.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{server.downloads.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex items-center space-x-1">
                <Wrench className="h-4 w-4" />
                <span>{server.tools.length} Tools</span>
              </div>
              {server.prompts > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{server.prompts} Prompts</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              <Hash className="h-3 w-3 text-slate-500 mt-0.5" />
              {server.hashtags.slice(0, 3).map((hashtag) => (
                <Badge key={hashtag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                  {hashtag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
