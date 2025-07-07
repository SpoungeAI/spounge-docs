import { changelogEntry as initialDocs } from './001-initial-documentation';

export interface ChangelogEntry {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export const changelogEntries: ChangelogEntry[] = [
  initialDocs // This must be an object of type ChangelogEntry
];

export default changelogEntries;