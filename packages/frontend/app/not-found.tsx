import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-300 mb-4">Page Not Found</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/">Go Home</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Link href="/servers">Browse Servers</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
