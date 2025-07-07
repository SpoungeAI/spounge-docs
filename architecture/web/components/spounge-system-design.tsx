import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SystemSidebar } from "@/components/system-sidebar"
import { MainContent } from "@/components/main-content"
import { TopNavbar } from "@/components/top-navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { getRouteById } from "@/lib/routes"
import { useIsMobile } from "@/hooks/use-mobile"
import { MenuIcon, PanelLeft, PanelLeftClose, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Changelog } from "@/components/changelog"

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  
  // Extract section from URL path when route changes
  useEffect(() => {
    const pathSection = location.pathname.substring(1) || initialSection
    setActiveSection(pathSection)
    // Ensure content area is scrolled to top when route changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
  }, [location.pathname, initialSection])

  // Handle section changes with router navigation
  const handleSectionChange = (sectionId: string) => {
    const route = getRouteById(sectionId)
    if (route) {
      navigate(route.path)
      setActiveSection(sectionId)
      // Manually scroll the main content area to top
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0
      }
      // Close sidebar on mobile after navigation
      if (isMobile) {
        setSidebarOpen(false)
      }
    }
  }

  const toggleSidebar = () => {
    // For mobile, toggle open/closed
    if (isMobile) {
      setSidebarOpen(prev => !prev)
    } 
    // For desktop, toggle collapsed/expanded
    else {
      setSidebarCollapsed(prev => !prev)
    }
  }

  const renderMainContent = () => {
    if (activeSection === "changelog") {
      return <Changelog />;
    }
    
    return (
      <MainContent 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
    );
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col h-screen w-full bg-background text-foreground">
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
              className="flex"
              onClick={toggleSidebar}
              aria-label={isMobile ? "Toggle Menu" : (sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar")}
            >
              {isMobile ? (
                <MenuIcon className="h-5 w-5" />
              ) : (
                sidebarCollapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />
              )}
            </Button>
          </TopNavbar>

          {/* Page content below navbar */}
          <div className="flex flex-1 pt-14 w-full overflow-hidden">
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
                ${isMobile ? 'fixed' : 'flex-none'} 
                z-40 transition-transform duration-300 ease-in-out
                ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
              `}
            >
              <aside className={`
                ${isMobile ? 'w-[280px]' : sidebarCollapsed ? 'w-12' : 'w-64'} 
                h-[calc(100vh-3.5rem)] bg-sidebar border-r
                transition-width duration-300
              `}
              style={{ 
                top: isMobile ? '3.5rem' : '0'
              }}
              >
                <SystemSidebar 
                  activeSection={activeSection} 
                  onSectionChange={handleSectionChange}
                  isCollapsed={sidebarCollapsed}
                />
              </aside>
            </div>

            {/* Main content */}
            <main ref={mainContentRef} className="flex-1 overflow-auto">
              {renderMainContent()}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
