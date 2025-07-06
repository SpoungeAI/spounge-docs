// Define the main routes for the application
export const routes = [
  {
    id: "roadmap",
    path: "/roadmap",
    label: "Implementation Roadmap"
  },
  {
    id: "architecture-diagrams",
    path: "/architecture-diagrams",
    label: "Architecture Diagrams"
  },
  // Core services
  {
    id: "api-gateway",
    path: "/api-gateway",
    label: "API Gateway",
    category: "core-services"
  },
  {
    id: "workflow-engine",
    path: "/workflow-engine",
    label: "Workflow Engine",
    category: "core-services"
  },
  {
    id: "user-service",
    path: "/user-service",
    label: "User Service",
    category: "core-services"
  },
  {
    id: "polykey-service",
    path: "/polykey-service",
    label: "Polykey Service",
    category: "core-services"
  },
  // Polykey tools
  {
    id: "llm-provider-service",
    path: "/llm-provider-service",
    label: "LLM Provider Service",
    category: "polykey-tools"
  },
  {
    id: "vector-db-service",
    path: "/vector-db-service",
    label: "Vector DB Service",
    category: "polykey-tools"
  },
  // Platform infrastructure
  {
    id: "key-vault",
    path: "/key-vault",
    label: "Key Vault",
    category: "platform-infrastructure"
  },
  {
    id: "state-management",
    path: "/state-management",
    label: "State Management",
    category: "platform-infrastructure"
  },
  {
    id: "service-mesh",
    path: "/service-mesh",
    label: "Service Mesh",
    category: "platform-infrastructure"
  },
  {
    id: "spounge-infra",
    path: "/spounge-infra",
    label: "Spounge Infrastructure",
    category: "platform-infrastructure"
  },
  // External client
  {
    id: "spounge-client",
    path: "/spounge-client",
    label: "Spounge Client",
    category: "external-client"
  },
  {
    id: "external-apis",
    path: "/external-apis",
    label: "External APIs",
    category: "external-client"
  },
  {
    id: "spounge-protos",
    path: "/spounge-protos",
    label: "Spounge Protos",
    category: "external-client"
  }
];

// Helper function to find route by ID
export const getRouteById = (id: string) => {
  return routes.find(route => route.id === id);
};

// Helper function to get all routes by category
export const getRoutesByCategory = (category: string) => {
  return routes.filter(route => route.category === category);
};

// Get all unique categories
export const getCategories = () => {
  const categories = routes
    .map(route => route.category)
    .filter(Boolean)
    .filter((category, index, self) => 
      category && self.indexOf(category) === index
    );
  
  return categories;
};

export default routes; 