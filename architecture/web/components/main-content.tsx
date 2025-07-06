import { SidebarInset } from "@/components/ui/sidebar"
import { RoadmapSection } from "@/components/roadmap-section"
import { ComponentDetail } from "@/components/component-detail"
import { systemData } from "@/lib/system-data"
import { ArchitectureDiagrams } from "@/components/architecture-diagrams"

interface MainContentProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function MainContent({ activeSection, onSectionChange }: MainContentProps) {
  const component = systemData.components.find((c) => c.id === activeSection)

  const handleNavigateFromDiagram = (componentId: string) => {
    onSectionChange(componentId)
  }

  return (
    <SidebarInset className="flex-1 min-w-0">
      <main className="h-full overflow-y-auto">
        <div className="mx-auto max-w-none px-6 py-8 lg:px-8 xl:px-12 2xl:px-16">
          <div className="mx-auto max-w-screen-xl space-y-8">
            {activeSection === "roadmap" && <RoadmapSection />}
            {activeSection === "architecture-diagrams" && (
              <ArchitectureDiagrams onNavigate={handleNavigateFromDiagram} />
            )}
            {component && <ComponentDetail component={component} />}
          </div>
        </div>
      </main>
    </SidebarInset>
  )
}
