import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400">
      <Link href="/" className="hover:text-blue-400 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/servers" className="hover:text-blue-400 transition-colors">
        MCP Servers
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-slate-300">IP Lookup</span>
    </nav>
  )
}
