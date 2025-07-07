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
import { Workflow, Shield, Database, Cpu, Globe, FileText, Cloud, ChevronRight, ChevronDown, History } from "lucide-react"
import { systemData } from "@/lib/system-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SystemSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isCollapsed?: boolean
}

export function SystemSidebar({ activeSection, onSectionChange, isCollapsed = false }: SystemSidebarProps) {
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
  
  // Conditionally render elements based on collapsed state
  const renderSectionButton = (id: string, icon: any, label: string) => {
    const Icon = icon
    if (isCollapsed && !isMobile) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleSectionClick(id)}
              className={`w-full flex justify-center px-2 py-2 rounded-md ${
                activeSection === id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      )
    }

    return (
      <button
        onClick={() => handleSectionClick(id)}
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
          activeSection === id
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </button>
    )
  }

  // Render hierarchical tooltip for collapsed groups
  const renderCollapsedGroupTooltip = (groupKey: string, groupLabel: string, groupIcon: any, components: any[]) => {
    const GroupIcon = groupIcon
    
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`w-full flex justify-center px-2 py-2 rounded-md hover:bg-sidebar-hover hover:text-sidebar-hover-foreground`}
          >
            <GroupIcon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="p-3 max-w-xs">
          <div className="space-y-2">
            <div className="font-medium text-sm border-b pb-2">{groupLabel}</div>
            <div className="space-y-1">
              {components.map((component) => {
                const IconComponent = getComponentIcon(component.id)
                return (
                  <button
                    key={component.id}
                    onClick={() => handleSectionClick(component.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md ${
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
              {/* Special handling for polykey-service sub-items */}
              {groupKey === "core-services" && (
                <div className="ml-4 space-y-1 border-l pl-2">
                  {polykeyTools.map((tool) => {
                    const ToolIcon = getComponentIcon(tool.id)
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSectionClick(tool.id)}
                        className={`w-full flex items-center gap-2 px-2 py-1 text-xs rounded-md ${
                          activeSection === tool.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                        }`}
                      >
                        <ToolIcon className="h-3 w-3" />
                        <span className="capitalize">{tool.id.replace("-", " ")}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className={`${isCollapsed && !isMobile ? 'w-12' : sidebarWidth} h-full bg-sidebar overflow-hidden`}>
      <div className="overflow-y-auto py-4 h-full">
        {/* Implementation Roadmap */}
        <div className={`${isCollapsed && !isMobile ? 'px-1' : 'px-3'} mb-3`}>
          <div>
            <div className="space-y-1">
              {renderSectionButton("roadmap", FileText, "Implementation Roadmap")}
            </div>
          </div>
        </div>

        {/* Architecture Diagrams */}
        <div className={`${isCollapsed && !isMobile ? 'px-1' : 'px-3'} mb-3`}>
          <div>
            <div className="space-y-1">
              {renderSectionButton("architecture-diagrams", Workflow, "Architecture Diagrams")}
            </div>
          </div>
        </div>

        {/* Collapsed view - show group icons with hierarchical tooltips */}
        {isCollapsed && !isMobile && (
          <div className="px-1 space-y-2">
            {renderCollapsedGroupTooltip("core-services", "Core Services", Workflow, coreServices)}
            {renderCollapsedGroupTooltip("platform-infrastructure", "Platform & Infrastructure", Cloud, platformInfra)}
            {renderCollapsedGroupTooltip("external-client", "External & Client", Globe, externalClient)}
          </div>
        )}

        {/* Expanded view - show full structure */}
        {(!isCollapsed || isMobile) && (
          <>
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
          </>
        )}

        {/* Changelog */}
        <div className={`${isCollapsed && !isMobile ? 'px-1' : 'px-3'} mb-3`}>
          <div>
            <div className="space-y-1">
              {renderSectionButton("changelog", History, "Changelog")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}