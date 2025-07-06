import { SidebarInset } from "@/components/ui/sidebar"
import { RoadmapSection } from "@/components/roadmap-section"
import { ComponentDetail } from "@/components/component-detail"
import { systemData } from "@/lib/system-data"
import { ArchitectureDiagrams } from "@/components/architecture-diagrams"
import { useIsMobile } from "@/hooks/use-mobile"

interface MainContentProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function MainContent({ activeSection, onSectionChange }: MainContentProps) {
  const component = systemData.components.find((c) => c.id === activeSection)
  const isMobile = useIsMobile()

  const handleNavigateFromDiagram = (componentId: string) => {
    onSectionChange(componentId)
  }

  return (
    <SidebarInset className="flex-1 min-w-0 w-full">
      <main className="h-full w-full overflow-y-auto">
        <div className="mx-auto px-3 py-4 md:px-6 md:py-8 lg:px-8 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-screen-xl space-y-6 md:space-y-8">
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
