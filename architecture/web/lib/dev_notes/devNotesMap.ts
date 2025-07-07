// 🔒 AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run `pnpm generate:dev-notes-map` to regenerate.

import type { DevNote } from '@/components/dev-notes'

// Define ChangelogEntry interface to avoid import issues
export interface ChangelogEntry {
  id: string
  title: string
  content: string
  author: string
  date: string
  tags: string[]
}

// General map for all dev notes (backward compatibility)
export const devNotesMap: Record<string, () => Promise<any>> = {
  "changelog": () => import("./changelog/index"),
  "polykey-service": () => import("./polykey-service/index")
}

// Service-specific map - returns { devNotes: DevNote[], default: DevNote[] }
export const serviceNotesMap: Record<string, () => Promise<{ devNotes: DevNote[], default: DevNote[] }>> = {
  "polykey-service": () => import("./polykey-service/index")
}

// Changelog-specific map - returns { changelogEntries: ChangelogEntry[], default: ChangelogEntry[] }
export const changelogNotesMap: Record<string, () => Promise<{ changelogEntries: ChangelogEntry[], default: ChangelogEntry[] }>> = {
  "changelog": () => import("./changelog/index")
}

// Type information for categorization
export const devNotesTypes = {
  services: ["polykey-service"],
  changelogs: ["changelog"]
} as const

// Helper functions for type-safe access
export async function getServiceNotes(serviceId: string): Promise<DevNote[]> {
  if (!(serviceId in serviceNotesMap)) {
    throw new Error(`Service "${serviceId}" not found`)
  }
  const module = await serviceNotesMap[serviceId]()
  return module.devNotes || module.default || []
}

export async function getChangelogEntries(changelogId: string = "changelog"): Promise<ChangelogEntry[]> {
  if (!(changelogId in changelogNotesMap)) {
    throw new Error(`Changelog "${changelogId}" not found`)
  }
  const module = await changelogNotesMap[changelogId]()
  // Fix: Access the named export first, then fall back to default
  return module.changelogEntries || module.default || []
}

// Get all service notes combined
export async function getAllServiceNotes(): Promise<DevNote[]> {
  const allNotes: DevNote[] = []
  for (const serviceId of devNotesTypes.services) {
    const notes = await getServiceNotes(serviceId)
    allNotes.push(...notes)
  }
  return allNotes
}
