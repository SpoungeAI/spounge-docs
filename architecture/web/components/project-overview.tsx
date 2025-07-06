"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, Star, GitFork, Eye, Search, Filter, Users, Package } from "lucide-react"
import { systemData } from "@/lib/system-data"

export function ProjectOverview() {
  const repositories = systemData.components.filter((c) => c.repository.startsWith("github.com"))

  const getLanguageFromTech = (tech: string) => {
    if (tech.includes("TypeScript") || tech.includes("Node.js")) return "TypeScript"
    if (tech.includes("Go")) return "Go"
    if (tech.includes("Python")) return "Python"
    return "Other"
  }

  const getLanguageColor = (language: string) => {
    const colors = {
      TypeScript: "bg-blue-500",
      Go: "bg-cyan-500",
      Python: "bg-yellow-500",
      Other: "bg-gray-500",
    }
    return colors[language as keyof typeof colors] || colors.Other
  }

  const languageStats = repositories.reduce(
    (acc, repo) => {
      const lang = getLanguageFromTech(repo.technologies)
      acc[lang] = (acc[lang] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
          <span className="text-2xl">🧽</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">SpoungeAI - System Architecture</h1>
          <p className="text-muted-foreground">
            A comprehensive microservices platform for AI workflow orchestration and secure tool execution.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="repositories" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Repositories
            <Badge variant="secondary" className="ml-1 text-xs">
              {repositories.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Projects
            <Badge variant="secondary" className="ml-1 text-xs">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            People
            <Badge variant="secondary" className="ml-1 text-xs">
              3
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Popular Repositories */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular repositories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {repositories.slice(0, 3).map((repo) => (
                    <div key={repo.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://${repo.repository}`}
                            className="font-semibold text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo.id}
                          </a>
                          <Badge variant="outline" className="text-xs">
                            Public
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div
                              className={`h-3 w-3 rounded-full ${getLanguageColor(getLanguageFromTech(repo.technologies))}`}
                            />
                            {getLanguageFromTech(repo.technologies)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />0
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />0
                          </div>
                          <span>Updated 2 days ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* People */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">People</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                        E
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                        R
                      </div>
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                        T
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(languageStats).map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${getLanguageColor(lang)}`} />
                      <span className="text-sm">{lang}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="repositories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Repositories
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Find a repository..." className="pl-8 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Type
                  </Button>
                  <Button variant="outline" size="sm">
                    Language
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://${repo.repository}`}
                        className="font-semibold text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.id}
                      </a>
                      <Badge variant="outline" className="text-xs">
                        Public
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div
                          className={`h-3 w-3 rounded-full ${getLanguageColor(getLanguageFromTech(repo.technologies))}`}
                        />
                        {getLanguageFromTech(repo.technologies)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />0
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />0
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />0
                      </div>
                      <span>Updated 2 days ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Phase 1: MVP Core</h3>
                <p className="text-sm text-muted-foreground mt-1">Essential services for the minimum viable product</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">In Progress</Badge>
                  <span className="text-xs text-muted-foreground">4 services</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Phase 2: Production Scale</h3>
                <p className="text-sm text-muted-foreground mt-1">Advanced features and production hardening</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Planned</Badge>
                  <span className="text-xs text-muted-foreground">3 services</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  E
                </div>
                <div>
                  <div className="font-semibold">Evan</div>
                  <div className="text-sm text-muted-foreground">Core Services & AI/ML</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  R
                </div>
                <div>
                  <div className="font-semibold">Ryan</div>
                  <div className="text-sm text-muted-foreground">API Gateway & User Services</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  T
                </div>
                <div>
                  <div className="font-semibold">Security Team</div>
                  <div className="text-sm text-muted-foreground">Infrastructure & Security</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
