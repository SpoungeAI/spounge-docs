import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Workflow, Shield, Database, Cpu, Globe, Cloud } from "lucide-react"
import { systemData } from "@/lib/system-data"

interface SearchDropdownProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSectionChange: (section: string) => void
}

export function SearchDropdown({ searchQuery, onSearchChange, onSectionChange }: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter components based on search query
  const filteredComponents = searchQuery
    ? systemData.components.filter((component) => {
        const nameMatch = component.id.toLowerCase().includes(searchQuery.toLowerCase())
        const tagMatch = component.tags.some((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
        const descriptionMatch = component.description.toLowerCase().includes(searchQuery.toLowerCase())
        return nameMatch || tagMatch || descriptionMatch
      })
    : []

  const getComponentIcon = (componentId: string) => {
    const iconMap: Record<string, any> = {
      "api-gateway": Globe,
      "workflow-engine": Workflow,
      "user-service": Database,
      "polykey-service": Shield,
      "llm-provider-service": Cpu,
      "vector-db-service": Database,
      "key-vault": Shield,
      "state-management": Database,
      "service-mesh": Cloud,
      "spounge-infra": Cloud,
      "spounge-client": Globe,
      "external-apis": Globe,
      "spounge-protos": FileText,
    }
    return iconMap[componentId] || FileText
  }

  const handleResultClick = (componentId: string) => {
    onSectionChange(componentId)
    setIsOpen(false)
    onSearchChange("")

    // Navigate to component section
    window.location.hash = componentId
    const element = document.getElementById(componentId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        onSearchChange("")
        inputRef.current?.blur()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onSearchChange])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search services... (⌘K)"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value)
            setIsOpen(e.target.value.length > 0)
          }}
          onFocus={() => setIsOpen(searchQuery.length > 0)}
          className="h-9 w-full pl-8 pr-4"
        />
      </div>

      {isOpen && searchQuery && (
        <div className="absolute left-0 right-0 top-full z-[9999] mt-1 max-h-96 overflow-y-auto rounded-md border bg-popover shadow-lg">
          {filteredComponents.length > 0 ? (
            <div className="p-2">
              <div className="mb-1 px-2 py-1 text-xs font-medium text-muted-foreground">
                {filteredComponents.length} result{filteredComponents.length !== 1 ? "s" : ""} found
              </div>
              {filteredComponents.map((component) => {
                const IconComponent = getComponentIcon(component.id)
                return (
                  <div
                    key={component.id}
                    onClick={() => handleResultClick(component.id)}
                    className="group flex cursor-pointer items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                  >
                    <IconComponent className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="truncate text-sm font-medium capitalize group-hover:text-foreground">
                          {component.id.replace("-", " ")}
                        </span>
                        <div className="flex flex-shrink-0 gap-1">
                          {component.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag.name} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs text-muted-foreground group-hover:text-muted-foreground">
                        {component.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No results found for "{searchQuery}"</div>
          )}
        </div>
      )}
    </div>
  )
}
