"use client"

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

interface SystemSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SystemSidebar({ activeSection, onSectionChange }: SystemSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "core-services": true,
    "polykey-tools": true,
    "platform-infrastructure": true,
    "external-client": true,
  })

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId)
    window.location.hash = sectionId
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="w-64 flex-shrink-0 border-r bg-sidebar lg:flex"
      style={{ top: "3.5rem" }} // Add this line if the container pt-14 doesn't work
    >
      <SidebarContent className="overflow-y-auto py-6">
        {/* Implementation Roadmap */}
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleSectionClick("roadmap")}
                  isActive={activeSection === "roadmap"}
                  className="w-full justify-start px-3 py-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Implementation Roadmap</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Architecture Diagrams */}
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleSectionClick("architecture-diagrams")}
                  isActive={activeSection === "architecture-diagrams"}
                  className="w-full justify-start px-3 py-2"
                >
                  <Workflow className="h-4 w-4" />
                  <span>Architecture Diagrams</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Core Services */}
        <Collapsible open={expandedGroups["core-services"]} onOpenChange={() => toggleGroup("core-services")}>
          <SidebarGroup className="px-3">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                {expandedGroups["core-services"] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Workflow className="h-4 w-4" />
                Core Services
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {coreServices.map((component) => {
                    const IconComponent = getComponentIcon(component.id)

                    if (component.id === "polykey-service") {
                      return (
                        <Collapsible
                          key={component.id}
                          open={expandedGroups["polykey-tools"]}
                          onOpenChange={() => toggleGroup("polykey-tools")}
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                onClick={() => handleSectionClick(component.id)}
                                isActive={activeSection === component.id}
                                className="w-full justify-between px-3 py-2"
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
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="ml-4 mt-1">
                                {polykeyTools.map((tool) => {
                                  const ToolIcon = getComponentIcon(tool.id)
                                  return (
                                    <SidebarMenuSubItem key={tool.id}>
                                      <SidebarMenuSubButton
                                        onClick={() => handleSectionClick(tool.id)}
                                        isActive={activeSection === tool.id}
                                        className="px-3 py-1.5"
                                      >
                                        <ToolIcon className="h-4 w-4" />
                                        <span className="capitalize">{tool.id.replace("-", " ")}</span>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )
                                })}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      )
                    }

                    return (
                      <SidebarMenuItem key={component.id}>
                        <SidebarMenuButton
                          onClick={() => handleSectionClick(component.id)}
                          isActive={activeSection === component.id}
                          className="px-3 py-2"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="capitalize">{component.id.replace("-", " ")}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Platform & Infrastructure */}
        <Collapsible
          open={expandedGroups["platform-infrastructure"]}
          onOpenChange={() => toggleGroup("platform-infrastructure")}
        >
          <SidebarGroup className="px-3">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                {expandedGroups["platform-infrastructure"] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Cloud className="h-4 w-4" />
                Platform & Infrastructure
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {platformInfra.map((component) => {
                    const IconComponent = getComponentIcon(component.id)
                    return (
                      <SidebarMenuItem key={component.id}>
                        <SidebarMenuButton
                          onClick={() => handleSectionClick(component.id)}
                          isActive={activeSection === component.id}
                          className="px-3 py-2"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="capitalize">{component.id.replace("-", " ")}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* External & Client */}
        <Collapsible open={expandedGroups["external-client"]} onOpenChange={() => toggleGroup("external-client")}>
          <SidebarGroup className="px-3">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                {expandedGroups["external-client"] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Globe className="h-4 w-4" />
                External & Client
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {externalClient.map((component) => {
                    const IconComponent = getComponentIcon(component.id)
                    return (
                      <SidebarMenuItem key={component.id}>
                        <SidebarMenuButton
                          onClick={() => handleSectionClick(component.id)}
                          isActive={activeSection === component.id}
                          className="px-3 py-2"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="capitalize">{component.id.replace("-", " ")}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  )
}
