import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

const guides = [
  {
    title: "Getting Started with Claude Desktop",
    description: "Learn how to configure MCP Collection servers in Claude Desktop for enhanced AI capabilities.",
    category: "Setup",
    readTime: "5 min read",
    href: "/guides/claude-desktop",
  },
  {
    title: "Using MCP with ChatGPT",
    description: "Step-by-step guide to integrate MCP Collection servers with ChatGPT and other OpenAI tools.",
    category: "Integration",
    readTime: "7 min read",
    href: "/guides/chatgpt-integration",
  },
  {
    title: "OAuth 2.1 Authentication Setup",
    description: "Complete guide to setting up secure OAuth 2.1 authentication for your MCP clients.",
    category: "Security",
    readTime: "10 min read",
    href: "/guides/oauth-setup",
  },
  {
    title: "API Rate Limits and Credits",
    description: "Understanding credit usage, rate limits, and best practices for efficient API consumption.",
    category: "Usage",
    readTime: "4 min read",
    href: "/guides/rate-limits",
  },
  {
    title: "Building Custom MCP Servers",
    description: "Learn how to create and deploy your own Model Context Protocol servers.",
    category: "Development",
    readTime: "15 min read",
    href: "/guides/custom-servers",
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems when using MCP Collection servers.",
    category: "Support",
    readTime: "8 min read",
    href: "/guides/troubleshooting",
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Guides</h1>
          <p className="text-slate-300">
            Comprehensive tutorials and guides to help you get the most out of MCP Collection.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <Link key={index} href={guide.href}>
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      {guide.category}
                    </Badge>
                    <span className="text-xs text-slate-400">{guide.readTime}</span>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{guide.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{guide.description}</p>
                  <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                    <span>Read guide</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <Card className="bg-slate-800/50 border-slate-700 mt-12">
          <CardHeader>
            <CardTitle className="text-white">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              Can't find what you're looking for? Check out our documentation or reach out to our support team.
            </p>
            <div className="flex space-x-4">
              <Link href="/documentation" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                View Documentation →
              </Link>
              <Link href="/support" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                Contact Support →
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
