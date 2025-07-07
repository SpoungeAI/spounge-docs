// scripts/generateDevNotesMap.ts
import { writeFile } from "fs/promises"
import { resolve, dirname, basename } from "path"
import { fileURLToPath } from "url"
import fg from "fast-glob"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function generateDevNotesMap() {
  const baseDir = resolve(__dirname, "../lib/dev_notes")
  
  // Debug: Check if directory exists and what files are found
  console.log(`🔍 Looking for files in: ${baseDir}`)
  console.log(`🔍 Pattern: ${baseDir}/*/index.ts`)
  
  const files = (await fg(`${baseDir}/*/index.ts`)).sort()
  console.log(`🔍 Found files:`, files)
  
  // Also check what directories exist
  const dirs = (await fg(`${baseDir}/*/`, { onlyDirectories: true })).sort()
  console.log(`🔍 Found directories:`, dirs)
  
  const entries = files.map((file: string) => {
    const componentId = basename(dirname(file))
    const importPath = `./${componentId}/index`
    
    // Determine the type based on the component ID
    const type = componentId === "changelog" ? "changelog" : "service"
    
    return {
      id: componentId,
      importPath,
      type,
      entry: `"${componentId}": () => import("${importPath}")`
    }
  })
  
  // Group entries by type
  const serviceEntries = entries.filter(e => e.type === "service")
  const changelogEntries = entries.filter(e => e.type === "changelog")
  
  const output = `// 🔒 AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run \`pnpm generate:dev-notes-map\` to regenerate.

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
  ${entries.map(e => e.entry).join(",\n  ")}
}

// Service-specific map - returns { devNotes: DevNote[], default: DevNote[] }
export const serviceNotesMap: Record<string, () => Promise<{ devNotes: DevNote[], default: DevNote[] }>> = {
  ${serviceEntries.map(e => e.entry).join(",\n  ")}
}

// Changelog-specific map - returns { changelogEntries: ChangelogEntry[], default: ChangelogEntry[] }
export const changelogNotesMap: Record<string, () => Promise<{ changelogEntries: ChangelogEntry[], default: ChangelogEntry[] }>> = {
  ${changelogEntries.map(e => e.entry).join(",\n  ")}
}

// Type information for categorization
export const devNotesTypes = {
  services: [${serviceEntries.map(e => `"${e.id}"`).join(", ")}],
  changelogs: [${changelogEntries.map(e => `"${e.id}"`).join(", ")}]
} as const

// Helper functions for type-safe access
export async function getServiceNotes(serviceId: string): Promise<DevNote[]> {
  if (!(serviceId in serviceNotesMap)) {
    throw new Error(\`Service "\${serviceId}" not found\`)
  }
  const module = await serviceNotesMap[serviceId]()
  return module.devNotes || module.default || []
}

export async function getChangelogEntries(changelogId: string = "changelog"): Promise<ChangelogEntry[]> {
  if (!(changelogId in changelogNotesMap)) {
    throw new Error(\`Changelog "\${changelogId}" not found\`)
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
`
  
  const outputPath = resolve(baseDir, "devNotesMap.ts")
  await writeFile(outputPath, output)
  
  console.log(`✅ devNotesMap.ts generated with ${entries.length} entries.`)
  console.log(`   - ${serviceEntries.length} service entries`)
  console.log(`   - ${changelogEntries.length} changelog entries`)
  console.log(`   - Services: ${serviceEntries.map(e => e.id).join(", ")}`)
  console.log(`   - Changelogs: ${changelogEntries.map(e => e.id).join(", ")}`)
}

generateDevNotesMap().catch((err) => {
  console.error("❌ Failed to generate devNotesMap.ts:", err)
  process.exit(1)
})