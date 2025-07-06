import { Badge } from "@/components/ui/badge"
import { GitBranch, Users, Package, Workflow, CheckCircle, Clock, ExternalLink, ArrowRight } from "lucide-react"

export function RoadmapSection() {
  return (
    <div id="roadmap" className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b">
        <h1 className="text-3xl font-semibold mb-3">SpoungeAI System Architecture</h1>
        <p className="text-base text-muted-foreground max-w-4xl leading-relaxed">
          Welcome to the central documentation hub for the SpoungeAI platform. This document provides a high-level
          overview of our system architecture, development philosophy, and team structure.
        </p>
      </div>

      {/* What is SpoungeAI */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold text-lg">What is SpoungeAI?</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            SpoungeAI is a self-hosted platform designed to make the power of Large Language Models (LLMs) and complex
            API integrations seamless for developers and accessible for everyday users. Our goal is to provide a secure,
            scalable, and extensible environment for building and deploying sophisticated AI-powered workflows without
            the typical overhead of managing credentials and orchestration logic.
          </p>
        </div>
      </div>

      {/* About This Document */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold text-lg">About This Document</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground mb-4">
            This site serves as the single source of truth for our technical architecture. It is a living document
            intended for:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
              <div>
                <span className="font-medium">Onboarding:</span>
                <span className="text-muted-foreground ml-1">
                  To help new team members quickly understand the different parts of our system and how they interact.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
              <div>
                <span className="font-medium">Development:</span>
                <span className="text-muted-foreground ml-1">
                  To provide detailed specifications for each microservice, clarifying responsibilities and
                  dependencies.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <div>
                <span className="font-medium">Architecture & Strategy:</span>
                <span className="text-muted-foreground ml-1">
                  To visualize our development roadmap and guide strategic decision-making.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* System at a Glance */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">System at a Glance</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Total Services</span>
            </div>
            <div className="text-2xl font-semibold">10</div>
            <div className="text-xs text-muted-foreground">Microservices</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Phase 1 (MVP Core)</span>
            </div>
            <div className="text-2xl font-semibold">7</div>
            <div className="text-xs text-muted-foreground">Services</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Phase 2 (Production Scale)</span>
            </div>
            <div className="text-2xl font-semibold">3</div>
            <div className="text-xs text-muted-foreground">Services</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Team Members</span>
            </div>
            <div className="text-2xl font-semibold">2</div>
            <div className="text-xs text-muted-foreground">Active Contributors</div>
          </div>
        </div>
      </div>

      {/* Implementation Philosophy & Phases */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Implementation Philosophy & Phases</h2>
          <p className="text-muted-foreground">
            Our architecture is designed for an iterative rollout. This phased approach allows for rapid delivery of
            core features while ensuring a modular foundation for future scalability and hardening.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Phase 1 */}
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs font-medium">
                  Phase 1
                </Badge>
                <h3 className="font-semibold">MVP</h3>
                <div className="flex items-center gap-1 ml-auto">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">In Progress</span>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="font-medium text-sm">Goal:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  The essential services to launch a functional product. This phase focuses on the primary user
                  workflow: authenticating, defining a simple workflow, and executing it securely.
                </p>
              </div>
              <div>
                <span className="font-medium text-sm">Core Services:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  This phase includes 7 core microservices essential for launch.
                </p>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs font-medium">
                  Phase 2
                </Badge>
                <h3 className="font-semibold">Production</h3>
                <div className="flex items-center gap-1 ml-auto">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Planned</span>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="font-medium text-sm">Goal:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Components that add critical observability, security hardening, and advanced AI capabilities like
                  long-term memory (RAG).
                </p>
              </div>
              <div>
                <span className="font-medium text-sm">Services:</span>
                <p className="text-sm text-muted-foreground mt-1">3 additional services for production scale.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold text-lg">Our Team</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground mb-4">
            SpoungeAI is currently built and maintained by a dynamic full-stack team of two. We collaborate on all
            aspects of the platform, from backend infrastructure to user interface design.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                E
              </div>
              <div>
                <div className="font-medium">Evan</div>
                <div className="text-sm text-muted-foreground">@Evantopian</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                R
              </div>
              <div>
                <div className="font-medium">Ryan</div>
                <div className="text-sm text-muted-foreground">@Ryanj-code</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore the System */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold text-lg">Explore the System</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="#architecture-diagrams"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
              onClick={() => {
                window.location.hash = "architecture-diagrams"
                const element = document.getElementById("architecture-diagrams")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <Workflow className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <div className="flex-1">
                <div className="font-medium">Architecture Diagrams & Service Details</div>
                <div className="text-sm text-muted-foreground">
                  Dive into interactive system diagrams and in-depth technical specifications for each microservice.
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </a>

            <a
              href="https://github.com/SpoungeAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <GitBranch className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <div className="flex-1">
                <div className="font-medium">GitHub Organization</div>
                <div className="text-sm text-muted-foreground">
                  Browse the source code repositories for all services and infrastructure.
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
