"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Plus, Key, User, CreditCard, LogOut } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  createdAt: string
}

export default function ProfilePage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "1", name: "test2", createdAt: "16/09/2025, 01:16:33" },
    { id: "2", name: "test", createdAt: "16/09/2025, 01:16:21" },
  ])
  const [newKeyName, setNewKeyName] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateApiKey = () => {
    if (newKeyName.trim()) {
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName.trim(),
        createdAt: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }
      setApiKeys([...apiKeys, newKey])
      setNewKeyName("")
      setIsCreateDialogOpen(false)
    }
  }

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="mt-2 text-slate-400">Manage your account settings and API keys.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Account Section */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-slate-400" />
                  <CardTitle className="text-white">Account</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">udaydahiya4601@gmail.com</p>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Authentication Method</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-400">Google</span>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Account Created</Label>
                  <p className="mt-1 text-slate-400">9/15/2025</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-slate-400" />
                  <CardTitle className="text-white">Subscription</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-white font-medium">Free Plan</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Plan</span>
                    <span className="text-white">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Credits</span>
                    <span className="text-white">100</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  Manage Subscription →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - API Keys */}
          <div>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-slate-400" />
                    <CardTitle className="text-white">API Keys</CardTitle>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Create API Key
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-800 text-white">
                      <DialogHeader>
                        <DialogTitle>Create New API Key</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Enter a name for your new API key. This will help you identify it later.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="keyName" className="text-slate-300">
                            Key Name
                          </Label>
                          <Input
                            id="keyName"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            placeholder="Enter key name..."
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(false)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleCreateApiKey} className="bg-blue-600 hover:bg-blue-700 text-white">
                          Create Key
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription className="text-slate-400">
                  Manage your API keys for accessing MCP servers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No API keys created yet</p>
                  </div>
                ) : (
                  apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700"
                    >
                      <div>
                        <h3 className="font-medium text-white">{key.name}</h3>
                        <p className="text-sm text-slate-400">Created: {key.createdAt}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteApiKey(key.id)}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
