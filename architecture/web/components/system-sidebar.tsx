import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Workflow, Shield, Database, Cpu, Globe, FileText, Cloud, ChevronRight, ChevronDown } from "lucide-react"
import { systemData } from "@/lib/system-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsMobile } from "@/hooks/use-mobile"

interface SystemSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SystemSidebar({ activeSection, onSectionChange }: SystemSidebarProps) {
  const isMobile = useIsMobile()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "core-services": true,
    "polykey-tools": true,
    "platform-infrastructure": true,
    "external-client": true,
  })

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId)
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  // Organize components by logical structure
  const coreServices = systemData.components.filter((c) =>
    ["api-gateway", "workflow-engine", "user-service", "polykey-service"].includes(c.id),
  )

  const polykeyTools = systemData.components.filter((c) => ["llm-provider-service", "vector-db-service"].includes(c.id))

  const platformInfra = systemData.components.filter((c) =>
    ["key-vault", "state-management", "service-mesh", "spounge-infra"].includes(c.id),
  )

  const externalClient = systemData.components.filter((c) =>
    ["spounge-client", "external-apis", "spounge-protos"].includes(c.id),
  )

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

  const sidebarWidth = isMobile ? 'w-full' : 'w-64'

  return (
    <div className={`${sidebarWidth} h-full bg-sidebar`}>
      <div className="overflow-y-auto py-4 h-full">
        {/* Implementation Roadmap */}
        <div className="px-3 mb-3">
          <div>
            <div className="space-y-1">
              <button
                onClick={() => handleSectionClick("roadmap")}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                  activeSection === "roadmap"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Implementation Roadmap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Architecture Diagrams */}
        <div className="px-3 mb-3">
          <div>
            <div className="space-y-1">
              <button
                onClick={() => handleSectionClick("architecture-diagrams")}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                  activeSection === "architecture-diagrams"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                }`}
              >
                <Workflow className="h-4 w-4" />
                <span>Architecture Diagrams</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <Collapsible open={expandedGroups["core-services"]} onOpenChange={() => toggleGroup("core-services")}>
          <div className="px-3 mb-1">
            <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-hover hover:text-sidebar-hover-foreground">
              {expandedGroups["core-services"] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Workflow className="h-4 w-4" />
              Core Services
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="ml-4 mt-1 space-y-1">
              {coreServices.map((component) => {
                const IconComponent = getComponentIcon(component.id)

                if (component.id === "polykey-service") {
                  return (
                    <Collapsible
                      key={component.id}
                      open={expandedGroups["polykey-tools"]}
                      onOpenChange={() => toggleGroup("polykey-tools")}
                    >
                      <div>
                        <CollapsibleTrigger asChild>
                          <button
                            onClick={() => handleSectionClick(component.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                              activeSection === component.id
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span className="capitalize">{component.id.replace("-", " ")}</span>
                            </div>
                            {expandedGroups["polykey-tools"] ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-4 mt-1 space-y-1">
                            {polykeyTools.map((tool) => {
                              const ToolIcon = getComponentIcon(tool.id)
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => handleSectionClick(tool.id)}
                                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md ${
                                    activeSection === tool.id
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                      : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                                  }`}
                                >
                                  <ToolIcon className="h-4 w-4" />
                                  <span className="capitalize">{tool.id.replace("-", " ")}</span>
                                </button>
                              )
                            })}
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  )
                }

                return (
                  <button
                    key={component.id}
                    onClick={() => handleSectionClick(component.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                      activeSection === component.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="capitalize">{component.id.replace("-", " ")}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Platform & Infrastructure */}
        <Collapsible
          open={expandedGroups["platform-infrastructure"]}
          onOpenChange={() => toggleGroup("platform-infrastructure")}
        >
          <div className="px-3 mb-1">
            <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-hover hover:text-sidebar-hover-foreground">
              {expandedGroups["platform-infrastructure"] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Cloud className="h-4 w-4" />
              Platform & Infrastructure
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="ml-4 mt-1 space-y-1">
              {platformInfra.map((component) => {
                const IconComponent = getComponentIcon(component.id)
                return (
                  <button
                    key={component.id}
                    onClick={() => handleSectionClick(component.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                      activeSection === component.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="capitalize">{component.id.replace("-", " ")}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* External & Client */}
        <Collapsible open={expandedGroups["external-client"]} onOpenChange={() => toggleGroup("external-client")}>
          <div className="px-3 mb-1">
            <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-hover hover:text-sidebar-hover-foreground">
              {expandedGroups["external-client"] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Globe className="h-4 w-4" />
              External & Client
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="ml-4 mt-1 space-y-1">
              {externalClient.map((component) => {
                const IconComponent = getComponentIcon(component.id)
                return (
                  <button
                    key={component.id}
                    onClick={() => handleSectionClick(component.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                      activeSection === component.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="capitalize">{component.id.replace("-", " ")}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Developer Notes */}
        <div className="px-3 mt-4">
          <div>
            <div className="space-y-1">
              <button
                onClick={() => handleSectionClick("dev-notes")}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                  activeSection === "dev-notes"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Developer Notes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
