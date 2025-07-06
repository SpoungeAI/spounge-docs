import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, GitBranch, Users, AlertTriangle, Rocket } from "lucide-react"
import type { Component } from "@/lib/system-data"
import { DevNotes } from "@/components/dev-notes"
import { DocumentationSidebar } from "@/components/documentation-sidebar"

interface ComponentDetailProps {
  component: Component
}

const tagColors = {
  Frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Gateway: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Orchestration: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  Security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "AI/ML": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Data: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Platform: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Tool: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "Third-Party": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  Contracts: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
}

export function ComponentDetail({ component }: ComponentDetailProps) {
  return (
    <div id={component.id} className="grid gap-6 lg:grid-cols-4">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="pb-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-semibold capitalize">{component.id.replace("-", " ")}</h1>
            <Badge variant="outline" className="text-sm font-medium">
              Phase {component.phase}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {component.tags.map((tag) => (
              <Badge
                key={tag.name}
                variant="secondary"
                className={`text-xs font-medium ${tagColors[tag.name as keyof typeof tagColors] || "bg-gray-100 text-gray-800"}`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="text-lg font-mono text-muted-foreground mb-3">{component.visualAnalogy}</div>
          <p className="text-base text-muted-foreground leading-relaxed">{component.description}</p>
        </div>

        {/* Repository & Tech Stack */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Repository</span>
            </div>
            {component.repository.startsWith("github.com") ? (
              <a
                href={`https://${component.repository}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {component.repository}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-muted-foreground text-sm">{component.repository}</span>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <div className="font-medium text-sm mb-2">Technologies</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{component.technologies}</p>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted/30">
            <h3 className="font-medium">Responsibilities</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {component.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                  <span className="leading-relaxed">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dependencies */}
        {component.dependencies && component.dependencies.length > 0 && (
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-medium">Dependencies</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {component.dependencies.map((dep) => (
                  <Badge key={dep} variant="outline" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ownership & Operations */}
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted/30">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Ownership & Operations
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Team Owner</h4>
              <p className="text-sm text-muted-foreground">{component.ownershipAndOperations.teamOwner}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1">Key Responsibilities</h4>
              <p className="text-sm text-muted-foreground">{component.ownershipAndOperations.keyResponsibilities}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                <Rocket className="h-3 w-3" />
                Deployment Strategy
              </h4>
              <p className="text-sm text-muted-foreground">{component.ownershipAndOperations.deploymentStrategy}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Containerization & Kubernetes
              </h4>
              <p className="text-sm text-muted-foreground">{component.ownershipAndOperations.containerization}</p>
            </div>
          </div>
        </div>

        {/* Strategic Options */}
        {component.strategicOptions && (
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-medium">Strategic Implementation Options</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Different approaches considered for implementing this component
              </p>
            </div>
            <div className="p-4">
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {component.strategicOptions.map((option, index) => (
                    <TabsTrigger key={index} value={index.toString()} className="text-xs">
                      {option.name.split(" ")[0]}
                      {option.recommendation && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          Recommended
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {component.strategicOptions.map((option, index) => (
                  <TabsContent key={index} value={index.toString()} className="space-y-4">
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        {option.name}
                        {option.recommendation && (
                          <Badge variant="default" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{option.summary}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h5 className="font-medium text-green-600 dark:text-green-400 mb-2 text-sm">Pros</h5>
                        <ul className="space-y-1">
                          {option.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="flex items-start gap-2 text-sm">
                              <div className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-green-500" />
                              <span className="text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-red-600 dark:text-red-400 mb-2 text-sm">Cons</h5>
                        <ul className="space-y-1">
                          {option.cons.map((con, conIndex) => (
                            <li key={conIndex} className="flex items-start gap-2 text-sm">
                              <div className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-red-500" />
                              <span className="text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        )}

        <DevNotes componentId={component.id} />
      </div>

      {/* Documentation Sidebar - Right Side */}
      <div className="lg:col-span-1">
        <DocumentationSidebar component={component} />
      </div>
    </div>
  )
}
