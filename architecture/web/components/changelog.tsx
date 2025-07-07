import { Badge } from "@/components/ui/badge"
import { Calendar, User, History } from "lucide-react"
import { getChangelogEntries, type ChangelogEntry } from "@/lib/dev_notes/devNotesMap"
import { useEffect, useState } from "react"

interface ChangelogProps {
  limit?: number;
}

export function Changelog({ limit }: ChangelogProps) {
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadChangelog() {
      try {
        const entries = await getChangelogEntries()
        setChangelogEntries(entries)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load changelog')
      } finally {
        setLoading(false)
      }
    }

    loadChangelog()
  }, [])

  const sortedEntries = [...changelogEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit ?? Infinity)

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8">
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
            <History className="h-6 w-6" />
            Changelog
          </h1>
          <div className="border rounded-lg p-6 text-center text-muted-foreground">
            Loading changelog...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8">
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
            <History className="h-6 w-6" />
            Changelog
          </h1>
          <div className="border rounded-lg p-6 text-center text-red-500">
            Error loading changelog: {error}
          </div>
        </div>
      </div>
    )
  }

  if (sortedEntries.length === 0) {
    return (
      <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8">
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
            <History className="h-6 w-6" />
            Changelog
          </h1>
          <div className="border rounded-lg p-6 text-center text-muted-foreground">
            No changelog entries available.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
          <History className="h-6 w-6" />
          Changelog
        </h1>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {sortedEntries.map((entry) => (
              <div key={entry.id} className="relative pl-12">
                <div className="absolute left-2 top-2 w-5 h-5 rounded-full border-4 border-background bg-primary transform -translate-x-1/2" />
                <div className="bg-card border rounded-md p-6 shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold text-lg">{entry.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {entry.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(entry.date)}
                      </div>
                    </div>
                    <p className="text-base">{entry.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}