import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react"
import { getServiceNotes, getChangelogEntries, devNotesTypes } from "@/lib/dev_notes/devNotesMap"

export interface DevNote {
  id: string
  componentId: string
  title: string
  content: string
  author: string
  date: string
  tags: string[]
}

export interface ChangelogEntry {
  id: string
  title: string
  content: string
  author: string
  date: string
  tags: string[]
}

interface DevNotesProps {
  componentId: string
  notesPerPage?: number
}

// Cache for loaded notes to avoid re-importing
const notesCache = new Map<string, DevNote[]>()
const changelogCache = new Map<string, ChangelogEntry[]>()

export function DevNotes({ componentId, notesPerPage = 1 }: DevNotesProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [notes, setNotes] = useState<DevNote[]>([])
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Determine if this is a service or changelog
  const isService = devNotesTypes.services.includes(componentId as "polykey-service")
  const isChangelog = devNotesTypes.changelogs.includes(componentId as "changelog")

  // Reset page when componentId changes
  useEffect(() => {
    setCurrentPage(0)
  }, [componentId])

  // Load notes using the generated map
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true)
      setError(null)

      try {
        if (isService) {
          // Load service notes
          const cachedNotes = notesCache.get(componentId)
          if (cachedNotes) {
            setNotes(cachedNotes)
            setChangelogEntries([])
            setLoading(false)
            return
          }

          const loadedNotes = await getServiceNotes(componentId)
          notesCache.set(componentId, loadedNotes)
          setNotes(loadedNotes)
          setChangelogEntries([])
        } else if (isChangelog) {
          // Load changelog entries
          const cachedEntries = changelogCache.get(componentId)
          if (cachedEntries) {
            setChangelogEntries(cachedEntries)
            setNotes([])
            setLoading(false)
            return
          }

          const loadedEntries = await getChangelogEntries(componentId)
          changelogCache.set(componentId, loadedEntries)
          setChangelogEntries(loadedEntries)
          setNotes([])
        } else {
          // Component not found
          setNotes([])
          setChangelogEntries([])
        }
      } catch (err) {
        console.error(`Failed to load dev notes for ${componentId}`, err)
        setError(`Failed to load notes for ${componentId}`)
        setNotes([])
        setChangelogEntries([])
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [componentId, isService, isChangelog])

  // Convert changelog entries to DevNote format for consistent display
  const convertedChangelogEntries = useMemo(() => {
    return changelogEntries.map((entry): DevNote => ({
      id: entry.id,
      componentId: componentId,
      title: entry.title,
      content: entry.content,
      author: entry.author,
      date: entry.date,
      tags: entry.tags,
    }))
  }, [changelogEntries, componentId])

  // Combine notes and changelog entries for display
  const allNotes = useMemo(() => {
    return [...notes, ...convertedChangelogEntries]
  }, [notes, convertedChangelogEntries])

  const sortedNotes = useMemo(() => {
    return [...allNotes].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [allNotes])

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(sortedNotes.length / notesPerPage)
    const currentNotes = sortedNotes.slice(
      currentPage * notesPerPage,
      (currentPage + 1) * notesPerPage
    )
    return { totalPages, currentNotes }
  }, [sortedNotes, currentPage, notesPerPage])

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, paginationInfo.totalPages - 1))
  }, [paginationInfo.totalPages])

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }, [])

  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }, [])

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (sortedNotes.length === 0) return <EmptyState />

  const { totalPages, currentNotes } = paginationInfo

  return (
    <div className="border rounded-lg">
      <Header componentType={isService ? "service" : isChangelog ? "changelog" : "unknown"} />
      <div className="p-4 space-y-4">
        {currentNotes.map((note) => (
          <NoteCard key={note.id} note={note} formatDate={formatDate} />
        ))}

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        )}
      </div>
    </div>
  )
}

// --- Subcomponents ---

const LoadingState = () => (
  <div className="border rounded-lg">
    <Header componentType="loading" />
    <div className="p-6 text-center text-muted-foreground">
      <div className="animate-pulse">Loading notes...</div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="border rounded-lg">
    <Header componentType="empty" />
    <div className="p-6 text-center text-muted-foreground">
      <User className="h-6 w-6 mx-auto mb-2 opacity-50" />
      <div className="text-sm">No dev notes yet</div>
      <div className="text-xs mt-1 text-muted-foreground/70">
        Developer notes will appear here once they're added
      </div>
    </div>
  </div>
)

const ErrorState = ({ error }: { error: string }) => (
  <div className="border rounded-lg">
    <Header componentType="error" />
    <div className="p-6 text-center text-muted-foreground">
      <AlertCircle className="h-6 w-6 mx-auto mb-2 text-amber-500" />
      <div className="text-sm">Unable to load developer notes</div>
      <div className="text-xs mt-1 text-muted-foreground/70">{error}</div>
    </div>
  </div>
)

const Header = ({ componentType }: { componentType: string }) => (
  <div className="p-4 border-b bg-muted/30">
    <h3 className="font-medium flex items-center gap-2">
      <User className="h-4 w-4" />
      Developer Notes
      {componentType === "service" && <Badge variant="outline" className="text-xs">Service</Badge>}
      {componentType === "changelog" && <Badge variant="outline" className="text-xs">Changelog</Badge>}
    </h3>
    <p className="text-sm text-muted-foreground mt-1">
      Development insights, updates, and technical notes from the team
    </p>
  </div>
)

interface NoteCardProps {
  note: DevNote
  formatDate: (date: string) => string
}

const NoteCard = ({ note, formatDate }: NoteCardProps) => (
  <div className="space-y-3">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <h4 className="font-medium">{note.title}</h4>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {note.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(note.date)}
          </div>
        </div>
      </div>
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
      {note.content}
    </p>
  </div>
)

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) => (
  <div className="flex items-center justify-between pt-4 border-t">
    <Button
      variant="outline"
      size="sm"
      onClick={onPrevious}
      disabled={currentPage === 0}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Previous
    </Button>

    <span className="text-sm text-muted-foreground">
      {currentPage + 1} of {totalPages}
    </span>

    <Button
      variant="outline"
      size="sm"
      onClick={onNext}
      disabled={currentPage === totalPages - 1}
    >
      Next
      <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
  </div>
)