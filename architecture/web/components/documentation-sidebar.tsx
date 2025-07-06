import { Badge } from "@/components/ui/badge"
import { ExternalLink, Book, FileText, Code, Database, Shield, Cloud } from "lucide-react"
import type { Component } from "@/lib/system-data"

interface DocumentationSidebarProps {
  component: Component
}

export function DocumentationSidebar({ component }: DocumentationSidebarProps) {
  const getDocumentationLinks = (component: Component) => {
    const links: Array<{ title: string; url: string; icon: any; description: string }> = []

    // Technology-specific documentation
    if (component.technologies.includes("TypeScript")) {
      links.push({
        title: "TypeScript Docs",
        url: "https://www.typescriptlang.org/docs/",
        icon: Code,
        description: "Official TypeScript documentation",
      })
    }

    if (component.technologies.includes("Node.js")) {
      links.push({
        title: "Node.js Docs",
        url: "https://nodejs.org/en/docs/",
        icon: Code,
        description: "Node.js runtime documentation",
      })
    }

    if (component.technologies.includes("Go")) {
      links.push({
        title: "Go Documentation",
        url: "https://golang.org/doc/",
        icon: Code,
        description: "Official Go programming language docs",
      })
    }

    if (component.technologies.includes("React")) {
      links.push({
        title: "React Docs",
        url: "https://react.dev/",
        icon: Code,
        description: "React library documentation",
      })
    }

    if (component.technologies.includes("gRPC")) {
      links.push({
        title: "gRPC Documentation",
        url: "https://grpc.io/docs/",
        icon: FileText,
        description: "gRPC framework documentation",
      })
    }

    if (component.technologies.includes("Redis")) {
      links.push({
        title: "Redis Documentation",
        url: "https://redis.io/documentation",
        icon: Database,
        description: "Redis in-memory database docs",
      })
    }

    if (component.technologies.includes("PostgreSQL")) {
      links.push({
        title: "PostgreSQL Docs",
        url: "https://www.postgresql.org/docs/",
        icon: Database,
        description: "PostgreSQL database documentation",
      })
    }

    if (component.technologies.includes("Prisma")) {
      links.push({
        title: "Prisma Documentation",
        url: "https://www.prisma.io/docs",
        icon: Database,
        description: "Prisma ORM documentation",
      })
    }

    if (component.technologies.includes("Kong")) {
      links.push({
        title: "Kong Gateway Docs",
        url: "https://docs.konghq.com/gateway/",
        icon: Shield,
        description: "Kong API Gateway documentation",
      })
    }

    if (component.technologies.includes("NGINX")) {
      links.push({
        title: "NGINX Documentation",
        url: "https://nginx.org/en/docs/",
        icon: Shield,
        description: "NGINX web server documentation",
      })
    }

    if (component.technologies.includes("Vault")) {
      links.push({
        title: "HashiCorp Vault",
        url: "https://www.vaultproject.io/docs",
        icon: Shield,
        description: "Vault secrets management docs",
      })
    }

    if (component.technologies.includes("Terraform")) {
      links.push({
        title: "Terraform Docs",
        url: "https://www.terraform.io/docs",
        icon: Cloud,
        description: "Infrastructure as Code documentation",
      })
    }

    if (component.technologies.includes("Helm")) {
      links.push({
        title: "Helm Documentation",
        url: "https://helm.sh/docs/",
        icon: Cloud,
        description: "Kubernetes package manager docs",
      })
    }

    if (component.technologies.includes("Istio")) {
      links.push({
        title: "Istio Documentation",
        url: "https://istio.io/latest/docs/",
        icon: Cloud,
        description: "Service mesh documentation",
      })
    }

    if (component.technologies.includes("Linkerd")) {
      links.push({
        title: "Linkerd Documentation",
        url: "https://linkerd.io/docs/",
        icon: Cloud,
        description: "Linkerd service mesh docs",
      })
    }

    // Always include Kubernetes and Docker docs for containerized services
    if (
      component.ownershipAndOperations.containerization.includes("Kubernetes") ||
      component.ownershipAndOperations.containerization.includes("Docker")
    ) {
      links.push({
        title: "Kubernetes Docs",
        url: "https://kubernetes.io/docs/",
        icon: Cloud,
        description: "Container orchestration platform",
      })

      links.push({
        title: "Docker Documentation",
        url: "https://docs.docker.com/",
        icon: Cloud,
        description: "Container platform documentation",
      })
    }

    // Add best practices and patterns
    links.push({
      title: "12-Factor App",
      url: "https://12factor.net/",
      icon: Book,
      description: "Methodology for building SaaS apps",
    })

    if (component.tags.some((tag) => tag.name === "Security")) {
      links.push({
        title: "OWASP Guidelines",
        url: "https://owasp.org/www-project-top-ten/",
        icon: Shield,
        description: "Web application security risks",
      })
    }

    return links
  }

  const documentationLinks = getDocumentationLinks(component)

  return (
    <div className="sticky top-20 space-y-6">
      {/* Documentation Links */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-medium flex items-center gap-2">
            <Book className="h-4 w-4" />
            Documentation
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {documentationLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors group"
            >
              <link.icon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm group-hover:text-foreground truncate">{link.title}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-medium text-sm">Technology Stack</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1">
            {component.technologies.split(", ").map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech.replace(/[.,]/g, "")}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
