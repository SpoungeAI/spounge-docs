import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SystemSidebar } from "@/components/system-sidebar"
import { MainContent } from "@/components/main-content"
import { TopNavbar } from "@/components/top-navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { getRouteById } from "@/lib/routes"

interface SpoungeSystemDesignProps {
  initialSection?: string;
}

export function SpoungeSystemDesign({ initialSection = "roadmap" }: SpoungeSystemDesignProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(initialSection)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  
  // Extract section from URL path when route changes
  useEffect(() => {
    const pathSection = location.pathname.substring(1) || initialSection
    setActiveSection(pathSection)
  }, [location.pathname, initialSection])

  // Handle section changes with router navigation
  const handleSectionChange = (sectionId: string) => {
    const route = getRouteById(sectionId)
    if (route) {
      navigate(route.path)
      setActiveSection(sectionId)
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="w-full min-h-screen bg-background text-foreground">
        <SidebarProvider defaultOpen={!isMobile}>
          {/* Fixed top navbar */}
          <TopNavbar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            onSectionChange={handleSectionChange}
          />

          {/* Page content below navbar */}
          <div className="pt-14 w-full">
            <div className="flex h-[calc(100vh-3.5rem)] w-full">
              {/* Sidebar with top padding to account for navbar */}
              <aside className="w-64 border-r h-full overflow-y-auto bg-sidebar pt-14">
                <SystemSidebar 
                  activeSection={activeSection} 
                  onSectionChange={handleSectionChange}
                />
              </aside>

              {/* Main content */}
              <main className="flex-1 overflow-y-auto px-6 py-4 bg-background w-full">
                <MainContent 
                  activeSection={activeSection} 
                  onSectionChange={handleSectionChange}
                />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
