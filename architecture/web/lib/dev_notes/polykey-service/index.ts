import { DevNote } from '@/components/dev-notes';

export const devNotes: DevNote[] = [
  {
    id: "polykey-001",
    componentId: "polykey-service",
    title: "Security Architecture Review",
    content:
      "Completed comprehensive security audit of the polykey service. Key findings include proper secret rotation mechanisms and secure memory handling. All secrets are cleared from memory within 100ms of API call completion. [reference]",
    author: "Security Team",
    date: "2024-01-15",
    tags: ["security", "audit", "memory-management"],
  },
  {
    id: "polykey-002",
    componentId: "polykey-service",
    title: "Performance Optimization Results",
    content:
      "Implemented connection pooling for Key Vault connections, reducing average secret retrieval time from 45ms to 12ms. Added circuit breaker pattern for external API calls. [reference]",
    author: "Evan",
    date: "2024-01-10",
    tags: ["performance", "optimization", "circuit-breaker"],
  },
  {
    id: "polykey-003",
    componentId: "polykey-service",
    title: "New Tool Integration Framework",
    content:
      "Developed standardized framework for adding new tool integrations. Each tool now requires only 3 files: schema definition, handler implementation, and test suite. Documentation updated with integration guide. [reference]",
    author: "Evan",
    date: "2024-01-05",
    tags: ["framework", "integration", "documentation"],
  },
];

export default devNotes; 