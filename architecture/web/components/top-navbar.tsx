import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDropdown } from "@/components/search-dropdown"
import { ExternalLink } from "lucide-react"
import { ReactNode } from "react"

interface TopNavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSectionChange: (section: string) => void
  children?: ReactNode
}

export function TopNavbar({ searchQuery, onSearchChange, onSectionChange, children }: TopNavbarProps) {
  return (
    <header className="fixed top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left side - Logo, title, and GitHub link */}
        <div className="flex items-center gap-2 md:gap-6">
          {children}
          <div className="flex items-center gap-2 md:gap-4">
            <SidebarTrigger className="hidden md:flex" />
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-8 w-8 md:h-9 md:w-9 rounded-md overflow-hidden">
                <img
                  src="/Spounge.webp"
                  alt="Spounge Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-base md:text-lg leading-tight">Spounge</span>
                <span className="text-xs text-muted-foreground leading-tight">Architecture</span>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/SpoungeAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>

        {/* Right side - Search and theme toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-full max-w-[160px] md:max-w-sm md:min-w-[200px]">
            <SearchDropdown
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSectionChange={onSectionChange}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
