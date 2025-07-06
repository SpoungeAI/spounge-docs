"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InteractiveMermaidDiagram } from "@/components/interactive-mermaid-diagram"
import { systemData } from "@/lib/system-data"

interface ArchitectureDiagramsProps {
  onNavigate?: (componentId: string) => void
}

export function ArchitectureDiagrams({ onNavigate }: ArchitectureDiagramsProps) {
  const [selectedDiagram, setSelectedDiagram] = useState<"phase1" | "phase2">("phase1")

  return (
    <div id="architecture-diagrams" className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b">
        <h1 className="text-3xl font-semibold mb-3">Architecture Diagrams</h1>
        <p className="text-base text-muted-foreground max-w-4xl leading-relaxed">
          Interactive system architecture diagrams showing the relationships between components. Click on components to
          navigate to their detailed documentation.
        </p>
      </div>

      {/* Diagram Selection */}
      <div className="flex gap-2">
        <Button
          variant={selectedDiagram === "phase1" ? "default" : "outline"}
          onClick={() => setSelectedDiagram("phase1")}
          size="sm"
        >
          Phase 1: MVP Core
        </Button>
        <Button
          variant={selectedDiagram === "phase2" ? "default" : "outline"}
          onClick={() => setSelectedDiagram("phase2")}
          size="sm"
        >
          Phase 2: Production Scale
        </Button>
      </div>

      {/* Phase 1 Diagram */}
      {selectedDiagram === "phase1" && (
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-medium">{systemData.diagrams.phase1.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{systemData.diagrams.phase1.goal}</p>
          </div>
          <div className="p-4">
            <InteractiveMermaidDiagram
              chart={systemData.diagrams.phase1.graph}
              id="phase1-diagram"
              onNavigate={onNavigate}
            />
          </div>
        </div>
      )}

      {/* Phase 2 Diagram */}
      {selectedDiagram === "phase2" && (
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-medium">{systemData.diagrams.phase2.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{systemData.diagrams.phase2.goal}</p>
          </div>
          <div className="p-4">
            <InteractiveMermaidDiagram
              chart={systemData.diagrams.phase2.graph}
              id="phase2-diagram"
              onNavigate={onNavigate}
            />
          </div>
        </div>
      )}
    </div>
  )
}
