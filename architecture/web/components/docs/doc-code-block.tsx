import React from 'react';
import { cn } from '@/lib/utils';

interface DocCodeBlockProps {
  language?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * DocCodeBlock component for displaying code examples with syntax highlighting
 * 
 * @example
 * <DocCodeBlock language="typescript" title="API Client Example">
 *   {`
 *   const client = new ApiClient();
 *   const response = await client.fetch('/users');
 *   `}
 * </DocCodeBlock>
 */
export function DocCodeBlock({ 
  language = "typescript", 
  title, 
  className, 
  children 
}: DocCodeBlockProps) {
  return (
    <div className={cn("rounded-md border my-6", className)}>
      {title && (
        <div className="bg-muted px-4 py-2 border-b">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{title}</p>
            {language && (
              <span className="text-xs text-muted-foreground">
                {language}
              </span>
            )}
          </div>
        </div>
      )}
      <pre className={cn(
        "p-4 overflow-x-auto text-sm",
        !title && "rounded-md border"
      )}>
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
} 