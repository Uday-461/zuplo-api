"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AuthDialog } from "@/components/auth-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, CreditCard, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  { name: "MCP Collection", href: "/", isLogo: true },
  { name: "MCP Servers", href: "/servers" },
  { name: "Developer Portal", href: "/developers" },
  { name: "Guides", href: "/guides" },
  { name: "Documentation", href: "/documentation" },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-400",
                  item.isLogo
                    ? "text-blue-400 text-lg font-semibold"
                    : pathname === item.href
                      ? "text-blue-400 border-b-2 border-blue-400 pb-4"
                      : "text-slate-300 hover:text-white",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/credits"
                  className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <span className="text-slate-400">💰</span>
                  <span>
                    {user?.credits || 0} / {user?.plan === "free" ? "100" : "500"}
                  </span>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {user?.email?.length > 20 ? `${user.email.substring(0, 17)}...` : user?.email}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center cursor-pointer text-slate-300 hover:text-white"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/credits"
                        className="flex items-center cursor-pointer text-slate-300 hover:text-white"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credits & Usage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem onClick={handleLogout} className="text-slate-300 hover:text-white cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <AuthDialog>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                  Sign In
                </Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
