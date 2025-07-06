"use client"

import { useEffect, useRef, useState } from "react"

interface MermaidDiagramProps {
  chart: string
  id: string
  interactive?: boolean
}

export function MermaidDiagram({ chart, id, interactive = false }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [mermaidInstance, setMermaidInstance] = useState<typeof import("mermaid").default | null>(null)

  // Load and initialize Mermaid once
 useEffect(() => {
    let isMounted = true
    async function loadMermaid() {
      if (typeof window === "undefined") return
      try {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "Inter, system-ui, sans-serif",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
        })

        if (isMounted) setMermaidInstance(mermaid)
      } catch (error) {
        console.error("Failed to load or initialize Mermaid:", error);
        // Optionally, handle the error state in the component, e.g., show an error message
      }
    }
    loadMermaid()

    return () => {
      isMounted = false
    }
  }, [])

  // Render Mermaid diagram when chart or mermaidInstance changes
  useEffect(() => {
      if (!mermaidInstance || !elementRef.current) return
      let isMounted = true // Keep track of mount status

      async function renderDiagram() {
        // Ensure ref and instance are valid and component is still mounted
        if (!elementRef.current || !mermaidInstance || !isMounted) return;

        try {
          // Clear previous content before rendering
          elementRef.current.innerHTML = '';

          // Await the render call as it might return a Promise
          // The render function might return an object with svg and bindFunctions
          await mermaidInstance.render(id, chart, elementRef.current);

          console.log(`Mermaid diagram "${id}" rendered successfully.`);

        } catch (error) {
          console.error("Failed to render Mermaid diagram:", error);
          // Optionally, handle the rendering error state, e.g., set an error state
        }
      }

      renderDiagram(); // Call the async function

      return () => {
        isMounted = false; // Set isMounted to false on cleanup
        // Cleanup logic if needed
        // Clearing the element's content on cleanup might also help prevent issues
        if (elementRef.current) {
          elementRef.current.innerHTML = '';
        }
      }
    }, [chart, id, mermaidInstance])

  // Add event delegation for interactive features
  useEffect(() => {
    if (!interactive || !elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target.matches('[id*="flowchart-"]')) {
        target.style.cursor = "pointer"
        target.style.transition = "all 0.2s ease"
        target.style.transform = "scale(1.05)"
        target.style.filter = "brightness(1.1)"
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target.matches('[id*="flowchart-"]')) {
        target.style.transform = "scale(1)"
        target.style.filter = "brightness(1)"
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target.matches('[id*="flowchart-"]')) {
        e.preventDefault()
        const textContent = target.textContent || ""

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

        let componentId = ""
        for (const [key, value] of Object.entries(componentMap)) {
          if (textContent.toLowerCase().includes(key.toLowerCase()) || textContent.includes(key)) {
            componentId = value
            break
          }
        }

        if (componentId) {
          window.location.hash = componentId
          const targetElement = document.getElementById(componentId)
          if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" })
          console.log(`Navigating to: ${componentId}`)
        }
      }
    }

    element.addEventListener("mouseenter", handleMouseEnter, true)
    element.addEventListener("mouseleave", handleMouseLeave, true)
    element.addEventListener("click", handleClick)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter, true)
      element.removeEventListener("mouseleave", handleMouseLeave, true)
      element.removeEventListener("click", handleClick)
    }
  }, [interactive])

  return (
    <div
      ref={elementRef}
      className={`w-full overflow-x-auto bg-white dark:bg-gray-900 rounded-lg p-4 border ${
        interactive ? "min-h-[600px]" : "min-h-[400px]"
      }`}
    />
  )
}
