import React from 'react';
import { cn } from '@/lib/utils';

interface DocSectionProps {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * DocSection component for creating consistent documentation sections
 * 
 * @example
 * <DocSection 
 *   title="API Gateway" 
 *   description="The API Gateway serves as the entry point for all client requests."
 * >
 *   <p>Content goes here...</p>
 * </DocSection>
 */
export function DocSection({ 
  id, 
  title, 
  description, 
  className, 
  children 
}: DocSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mb-12 scroll-m-20 border-b pb-8", 
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
      )}
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
} 