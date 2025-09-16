import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">MCP Collection</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Browse and interact with our collection of Model Context Protocol servers. Get comprehensive tools for IP
            lookup, weather data, financial information, and more.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/servers">Browse Servers</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Link href="/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
