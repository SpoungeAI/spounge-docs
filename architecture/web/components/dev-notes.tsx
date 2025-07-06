"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"

interface DevNote {
  id: string
  componentId: string
  title: string
  content: string
  author: string
  date: string
  tags: string[]
}

interface DevNotesProps {
  componentId: string
}

// Mock dev notes data - only for polykey-service
const devNotesData: DevNote[] = [
  {
    id: "polykey-001",
    componentId: "polykey-service",
    title: "Security Architecture Review",
    content:
      "Completed comprehensive security audit of the polykey service. Key findings include proper secret rotation mechanisms and secure memory handling. All secrets are cleared from memory within 100ms of API call completion. [reference]",
    author: "Security Team",
    date: "2024-01-15",
    tags: ["security", "audit", "memory-management"],
  },
  {
    id: "polykey-002",
    componentId: "polykey-service",
    title: "Performance Optimization Results",
    content:
      "Implemented connection pooling for Key Vault connections, reducing average secret retrieval time from 45ms to 12ms. Added circuit breaker pattern for external API calls. [reference]",
    author: "Evan",
    date: "2024-01-10",
    tags: ["performance", "optimization", "circuit-breaker"],
  },
  {
    id: "polykey-003",
    componentId: "polykey-service",
    title: "New Tool Integration Framework",
    content:
      "Developed standardized framework for adding new tool integrations. Each tool now requires only 3 files: schema definition, handler implementation, and test suite. Documentation updated with integration guide. [reference]",
    author: "Evan",
    date: "2024-01-05",
    tags: ["framework", "integration", "documentation"],
  },
]

export function DevNotes({ componentId }: DevNotesProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const notesPerPage = 1

  // Filter notes for this component and sort by date (newest first)
  const componentNotes = devNotesData
    .filter((note) => note.componentId === componentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (componentNotes.length === 0) {
    return null
  }

  const totalPages = Math.ceil(componentNotes.length / notesPerPage)
  const currentNotes = componentNotes.slice(currentPage * notesPerPage, (currentPage + 1) * notesPerPage)

  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Developer Notes
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Development insights, updates, and technical notes from the team
        </p>
      </div>
      <div className="p-4 space-y-4">
        {currentNotes.map((note) => (
          <div key={note.id} className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">{note.title}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {note.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(note.date)}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentPage + 1} of {totalPages}
            </span>

            <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages - 1}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
