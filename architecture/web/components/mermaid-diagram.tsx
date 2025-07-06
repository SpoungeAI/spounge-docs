"use client"

import { useEffect, useRef } from "react"

interface MermaidDiagramProps {
  chart: string
  id: string
  interactive?: boolean
}

export function MermaidDiagram({ chart, id, interactive = false }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (typeof window !== "undefined") {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "Inter, system-ui, sans-serif",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
        })

        if (elementRef.current) {
          elementRef.current.innerHTML = `<div class="mermaid">${chart}</div>`
          await mermaid.run()

          if (interactive) {
            // Add click handlers for navigation
            const nodes = elementRef.current.querySelectorAll('[id*="flowchart-"]')
            nodes.forEach((node) => {
              const element = node as HTMLElement
              element.style.cursor = "pointer"
              element.style.transition = "all 0.2s ease"

              // Add hover effects
              element.addEventListener("mouseenter", () => {
                element.style.transform = "scale(1.05)"
                element.style.filter = "brightness(1.1)"
              })

              element.addEventListener("mouseleave", () => {
                element.style.transform = "scale(1)"
                element.style.filter = "brightness(1)"
              })

              element.addEventListener("click", (e) => {
                e.preventDefault()

                // Extract the component ID from the node text content
                const textContent = element.textContent || ""
                let componentId = ""

                // Map diagram text to component IDs
                const componentMap: Record<string, string> = {
                  "spounge-client": "spounge-client",
                  "api-gateway": "api-gateway",
                  "workflow-engine": "workflow-engine",
                  "polykey-service": "polykey-service",
                  "user-service": "user-service",
                  "llm-provider-service": "llm-provider-service",
                  "vector-db-service": "vector-db-service",
                  "Key Vault": "key-vault",
                  "State Management": "state-management",
                  "service-mesh": "service-mesh",
                  "spounge-infra": "spounge-infra",
                  "External APIs": "external-apis",
                }

                // Find matching component ID
                for (const [key, value] of Object.entries(componentMap)) {
                  if (textContent.toLowerCase().includes(key.toLowerCase()) || textContent.includes(key)) {
                    componentId = value
                    break
                  }
                }

                if (componentId) {
                  // Navigate to component section
                  window.location.hash = componentId
                  const targetElement = document.getElementById(componentId)
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }

                  // Trigger section change if there's a way to access the parent component's state
                  // This would need to be passed down as a prop in a real implementation
                  console.log(`Navigating to: ${componentId}`)
                }
              })
            })
          }
        }
      }
    }

    renderDiagram()
  }, [chart, id, interactive])

  return (
    <div
      ref={elementRef}
      className={`w-full overflow-x-auto bg-white dark:bg-gray-900 rounded-lg p-4 border ${
        interactive ? "min-h-[600px]" : "min-h-[400px]"
      }`}
    />
  )
}
