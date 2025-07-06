# Documentation Components

This directory contains reusable components for creating consistent documentation pages.

## Available Components

### DocSection

A component for creating consistent documentation sections with titles and descriptions.

```tsx
import { DocSection } from '@/components/docs';

<DocSection 
  title="API Gateway" 
  description="The API Gateway serves as the entry point for all client requests."
>
  <p>Content goes here...</p>
</DocSection>
```

### DocCodeBlock

A component for displaying code examples with syntax highlighting.

```tsx
import { DocCodeBlock } from '@/components/docs';

<DocCodeBlock 
  language="typescript" 
  title="API Client Example"
>
  {`
  const client = new ApiClient();
  const response = await client.fetch('/users');
  `}
</DocCodeBlock>
```

### DocTemplate

A template component that can be used as a starting point for new documentation pages.

```tsx
// Copy the template and customize it for your specific documentation needs
import { DocTemplate } from '@/components/docs';
```

## Creating New Documentation

1. Create a new file in the appropriate directory
2. Copy the `DocTemplate` component as a starting point
3. Customize the content for your specific documentation needs
4. Use `DocSection` and `DocCodeBlock` components for consistent styling

## Best Practices

1. Use clear, concise titles and descriptions
2. Include code examples where appropriate
3. Group related information into sections
4. Use headings to create a clear hierarchy
5. Include diagrams for complex concepts (use Mermaid diagrams) 