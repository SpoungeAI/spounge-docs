import React from 'react';
import { DocSection, DocCodeBlock } from '@/components/docs';

/**
 * Documentation Template
 * 
 * This is a template for creating new documentation pages.
 * Copy this file and customize it for your specific documentation needs.
 */
export function DocTemplate() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Documentation Title</h1>
      <p className="text-xl mb-8">
        High-level overview of this documentation section.
      </p>
      
      <DocSection 
        title="Getting Started" 
        description="How to get started with this component/service."
      >
        <p className="mb-4">
          Detailed explanation goes here...
        </p>
        
        <DocCodeBlock 
          language="typescript" 
          title="Example Usage"
        >
          {`// Example code
const example = new ExampleClass();
example.doSomething();`}
        </DocCodeBlock>
      </DocSection>
      
      <DocSection 
        title="API Reference" 
        description="Detailed API documentation."
      >
        <h3 className="text-xl font-semibold mb-3">Methods</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            <code className="font-mono bg-muted px-1 rounded">methodName(param: string): void</code> - 
            Description of what this method does.
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3">Properties</h3>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <code className="font-mono bg-muted px-1 rounded">propertyName: string</code> - 
            Description of this property.
          </li>
        </ul>
      </DocSection>
    </div>
  );
} 