"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react"

interface InteractiveMermaidDiagramProps {
  chart: string
  id: string
  onNavigate?: (componentId: string) => void
}

export function InteractiveMermaidDiagram({ chart, id, onNavigate }: InteractiveMermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleZoom = (newZoom: number) => {
    const clampedZoom = Math.min(Math.max(newZoom, 0.25), 4)
    setZoom(clampedZoom)
  }

  const handleZoomIn = () => handleZoom(zoom + 0.25)
  const handleZoomOut = () => handleZoom(zoom - 0.25)
  const handleReset = () => setZoom(1)

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Component ID mapping for navigation
  const getComponentIdFromText = (text: string): string => {
    const cleanText = text.toLowerCase().trim()

    // Direct mappings for exact matches
    const exactMappings: Record<string, string> = {
      "spounge-client": "spounge-client",
      "api-gateway": "api-gateway",
      "workflow-engine": "workflow-engine",
      "polykey-service": "polykey-service",
      "user-service": "user-service",
      "llm-provider-service": "llm-provider-service",
      "vector-db-service": "vector-db-service",
      "key vault": "key-vault",
      "state management": "state-management",
      "service-mesh": "service-mesh",
      "spounge-infra": "spounge-infra",
      "external apis": "external-apis",
      "spounge-protos": "spounge-protos",
    }

    // Check exact matches first
    if (exactMappings[cleanText]) {
      return exactMappings[cleanText]
    }

    // Partial matches for complex text
    for (const [key, value] of Object.entries(exactMappings)) {
      if (cleanText.includes(key) || key.includes(cleanText)) {
        return value
      }
    }

    return ""
  }

  const handleNodeClick = (nodeText: string) => {
    const componentId = getComponentIdFromText(nodeText)

    if (componentId) {
      // Close fullscreen if open
      if (document.fullscreenElement) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }

      // Use callback if provided, otherwise navigate directly
      if (onNavigate) {
        onNavigate(componentId)
      } else {
        // Navigate to component section
        window.location.hash = componentId
        const targetElement = document.getElementById(componentId)
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }
      }
    }
  }

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

          // Add click handlers for navigation
          const svgElement = elementRef.current.querySelector("svg")
          if (svgElement) {
            // Make SVG responsive
            svgElement.style.maxWidth = "100%"
            svgElement.style.height = "auto"

            // Add click handlers to all clickable elements
            const clickableElements = svgElement.querySelectorAll('g[class*="node"], rect, circle, polygon')
            clickableElements.forEach((element) => {
              const htmlElement = element as HTMLElement
              htmlElement.style.cursor = "pointer"
              htmlElement.style.transition = "all 0.2s ease"

              // Add hover effects
              htmlElement.addEventListener("mouseenter", () => {
                htmlElement.style.opacity = "0.8"
                htmlElement.style.filter = "brightness(1.1)"
              })

              htmlElement.addEventListener("mouseleave", () => {
                htmlElement.style.opacity = "1"
                htmlElement.style.filter = "brightness(1)"
              })

              htmlElement.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()

                // Find the text content in the node
                const parentNode = htmlElement.closest('g[class*="node"]')
                const textElement = parentNode?.querySelector("text, span, div")
                const nodeText = textElement?.textContent || htmlElement.textContent || ""

                if (nodeText.trim()) {
                  handleNodeClick(nodeText.trim())
                }
              })
            })
          }
        }
      }
    }

    renderDiagram()
  }, [chart, id])

  // Scroll wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        handleZoom(zoom + delta)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [zoom])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div ref={containerRef} className={`relative ${isFullscreen ? "bg-background p-8" : ""}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset} className="bg-background/80 backdrop-blur-sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleFullscreen} className="bg-background/80 backdrop-blur-sm">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Diagram container */}
      <div
        className="w-full overflow-auto bg-white dark:bg-gray-900 rounded-lg border transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          minHeight: isFullscreen ? "80vh" : "500px",
        }}
      >
        <div ref={elementRef} className="w-full p-4" />
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Click on components to navigate • Ctrl/Cmd + scroll to zoom • Use controls for precise zoom
      </div>
    </div>
  )
}
