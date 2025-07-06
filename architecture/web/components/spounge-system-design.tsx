import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SystemSidebar } from "@/components/system-sidebar"
import { MainContent } from "@/components/main-content"
import { TopNavbar } from "@/components/top-navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { getRouteById } from "@/lib/routes"
import { useIsMobile } from "@/hooks/use-mobile"
import { MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SpoungeSystemDesignProps {
  initialSection?: string;
}

export function SpoungeSystemDesign({ initialSection = "roadmap" }: SpoungeSystemDesignProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [activeSection, setActiveSection] = useState(initialSection)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
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
      // Close sidebar on mobile after navigation
      if (isMobile) {
        setSidebarOpen(false)
      }
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="w-full min-h-screen bg-background text-foreground">
        <SidebarProvider defaultOpen={false}>
          {/* Fixed top navbar */}
          <TopNavbar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            onSectionChange={handleSectionChange}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Menu"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </TopNavbar>

          {/* Page content below navbar */}
          <div className="pt-14 w-full h-[calc(100vh-3.5rem)]">
            <div className="flex h-full w-full relative">
              {/* Mobile sidebar overlay */}
              {isMobile && sidebarOpen && (
                <div 
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Mobile sidebar close button */}
              {isMobile && sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="fixed top-4 right-4 z-50 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close Menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}

              {/* Sidebar */}
              <div 
                className={`
                  ${isMobile ? 'fixed' : 'relative'} 
                  z-40 transition-transform duration-300 ease-in-out
                  ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
                `}
              >
                <aside className={`
                  ${isMobile ? 'w-[280px]' : 'w-64'} 
                  h-full overflow-y-auto bg-sidebar border-r
                `}
                style={{ 
                  height: 'calc(100vh - 3.5rem)',
                  top: isMobile ? '3.5rem' : '0'
                }}
                >
                  <SystemSidebar 
                    activeSection={activeSection} 
                    onSectionChange={handleSectionChange}
                  />
                </aside>
              </div>

              {/* Main content */}
              <main className={`
                flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-4 bg-background w-full
              `}>
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
