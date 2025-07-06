export interface Tag {
  name: string
  color: string
}

export interface StrategicOption {
  name: string
  recommendation: boolean
  summary: string
  pros: string[]
  cons: string[]
}

export interface OwnershipAndOperations {
  teamOwner: string
  keyResponsibilities: string
  deploymentStrategy: string
  containerization: string
}

export interface Component {
  id: string
  phase: number
  tags: Tag[]
  repository: string
  visualAnalogy: string
  description: string
  responsibilities: string[]
  dependencies: string[]
  technologies: string
  ownershipAndOperations: OwnershipAndOperations
  strategicOptions?: StrategicOption[]
}

export interface Phase {
  id: number
  name: string
  description: string
}

export interface Diagram {
  title: string
  goal: string
  graph: string
}

export interface SystemData {
  appName: string
  appDescription: string
  roadmap: {
    description: string
    phases: Phase[]
  }
  diagrams: {
    phase1: Diagram
    phase2: Diagram
  }
  components: Component[]
}

export const systemData: SystemData = {
  appName: "SpoungeAI Interactive System Design",
  appDescription:
    "This document outlines the complete technical specification for the SpoungeAI cloud architecture, designed for generation into an interactive web application. It details the system's components, phased implementation roadmap, and security-first principles.",
  roadmap: {
    description:
      "Our architecture is designed for an iterative rollout. This phased approach allows for rapid delivery of core features while ensuring a modular foundation for future scalability and hardening.",
    phases: [
      {
        id: 1,
        name: "MVP Core",
        description:
          "The essential services to launch a functional product. This phase focuses on the primary user workflow: authenticating, defining a simple workflow, and executing it securely.",
      },
      {
        id: 2,
        name: "Production",
        description:
          "Components that add critical observability, security hardening, and advanced AI capabilities like long-term memory (RAG).",
      },
    ],
  },
  diagrams: {
    phase1: {
      title: "Phase 1: MVP Core Architecture",
      goal: "This diagram shows the essential services for the MVP. Note how `polykey-service` acts as the exclusive gateway for all 'tool' executions.",
      graph: `graph TD
    subgraph External
        A[spounge-client];
    end

    subgraph "Kubernetes Cluster (MVP)"
        C[api-gateway];
        E[workflow-engine];
        F[polykey-service];
        I[user-service];
        J[Key Vault];
        K[State Management];

        subgraph "Tools (Called by Polykey)"
            style Tools fill:none,stroke:#ff9800,stroke-width:2px,stroke-dasharray: 5 5
            G[llm-provider-service];
            B["External APIs<br/>(e.g., Slack)"];
        end

        A -- HTTPS --> C;
        C -- K8s DNS --> E;
        C -- K8s DNS --> I;
        E -- gRPC Tool Call --> F;
        E -- Redis Protocol --> K;
        F -- Fetches Secret --> J;
        F -- Routes to LLM Tool --> G;
        F -- Routes to External Tool --> B;
    end

    %% Click interactions
    click A "#spounge-client"
    click B "#external-apis"
    click C "#api-gateway"
    click E "#workflow-engine"
    click F "#polykey-service"
    click G "#llm-provider-service"
    click I "#user-service"
    click J "#key-vault"
    click K "#state-management"`,
    },
    phase2: {
      title: "Phase 2: Production Scale & Team Ownership",
      goal: "This diagram shows the full production architecture, emphasizing how services are owned and managed by different teams. The Service Mesh enables secure, observable communication, while the Infrastructure repo provides a single source of truth for deployment. This model allows developer teams to own their services end-to-end, from code to production monitoring, fostering accountability and rapid, independent delivery.",
      graph: `graph TD
    subgraph "Production Kubernetes Cluster"
        subgraph "Core Services (App-Dev Team)"
            C_p2[api-gateway]
            E_p2[workflow-engine]
            F_p2[polykey-service]
            I_p2[user-service]
            K_p2[State Management]
        end

        subgraph "AI Tools (AI/ML Team)"
            style Tools_p2 fill:none,stroke:#ff9800,stroke-width:2px,stroke-dasharray: 5 5
            G_p2[llm-provider-service]
            H_p2[vector-db-service]
        end
        
        subgraph "External Tools"
             B_p2[External APIs]
        end

        subgraph "Platform & Security (Infra Team)"
            style Infra_p2 fill:none,stroke:#4caf50,stroke-width:2px,stroke-dasharray: 5 5
            D_p2[service-mesh]
            J_p2[Key Vault]
            L_p2[spounge-infra]
        end

        E_p2 -- gRPC Tool Call --> F_p2;
        F_p2 -- Routes to --> G_p2;
        F_p2 -- Routes to --> H_p2;
        F_p2 -- Routes to --> B_p2;
        F_p2 -- Fetches Secret --> J_p2;

        D_p2 -- Wraps & Secures All --> C_p2;
        D_p2 -- Wraps & Secures All --> E_p2;
        D_p2 -- Wraps & Secures All --> F_p2;
        D_p2 -- Wraps & Secures All --> I_p2;
        D_p2 -- Wraps & Secures All --> G_p2;
        D_p2 -- Wraps & Secures All --> H_p2;

        L_p2 -- Deploys & Manages --> D_p2;
        L_p2 -- Deploys & Manages --> C_p2;
        L_p2 -- Deploys & Manages --> E_p2;
    end

    %% Click interactions
    click C_p2 "#api-gateway"
    click E_p2 "#workflow-engine"
    click F_p2 "#polykey-service"
    click I_p2 "#user-service"
    click K_p2 "#state-management"
    click G_p2 "#llm-provider-service"
    click H_p2 "#vector-db-service"
    click B_p2 "#external-apis"
    click D_p2 "#service-mesh"
    click J_p2 "#key-vault"
    click L_p2 "#spounge-infra"`,
    },
  },
  components: [
    {
      id: "spounge-client",
      phase: 1,
      tags: [{ name: "Frontend", color: "blue" }],
      repository: "github.com/SpoungeAI/spounge-client",
      visualAnalogy: "[🎨 Design Studio] -> (User builds) -> [🏗️ Blueprint]",
      description:
        "The user-facing single-page application (SPA) where users build, manage, and execute their workflows.",
      responsibilities: [
        "UI/UX for workflow and agent creation.",
        "User authentication (JWT handling) and session management.",
        "Sending gRPC-Web or REST requests to the API Gateway.",
      ],
      dependencies: ["api-gateway"],
      technologies: "React, TypeScript, Vite, TanStack Query.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities: "Component library development, end-to-end testing, browser performance monitoring.",
        deploymentStrategy: "CI/CD via Vercel or Netlify, deploying automatically on merge to the `main` branch.",
        containerization: "Static site deployment, no containerization required. Uses CDN for global distribution.",
      },
    },
    {
      id: "api-gateway",
      phase: 1,
      tags: [{ name: "Gateway", color: "purple" }],
      repository: "github.com/SpoungeAI/api-gateway",
      visualAnalogy: "[🛂 Border Control] -> (Checks Passport) 🎫 -> [✅ Grant Entry]",
      description: "The single, unified entry point for all external traffic into the Kubernetes cluster.",
      responsibilities: [
        "Terminate TLS.",
        "Authenticate requests (JWT validation).",
        "Enforce rate limiting and usage quotas.",
        "Route traffic to internal services.",
        "Translate REST/gRPC-Web to internal gRPC.",
      ],
      dependencies: ["workflow-engine", "user-service"],
      technologies: "TypeScript, gRPC-Web, Kong or NGINX with custom Lua scripting.",
      ownershipAndOperations: {
        teamOwner: "Ryan",
        keyResponsibilities:
          "Maintaining routing rules, managing TLS certificates, monitoring ingress traffic for anomalies and attacks.",
        deploymentStrategy:
          "Configuration is managed via Kubernetes manifests in the `spounge-infra` repo. Changes are applied via a GitOps workflow (ArgoCD/Flux).",
        containerization:
          "Deployed as Kubernetes Deployment with 3 replicas. Uses NGINX base image with custom configuration. Horizontal Pod Autoscaler configured for traffic spikes.",
      },
    },
    {
      id: "workflow-engine",
      phase: 1,
      tags: [{ name: "Orchestration", color: "teal" }],
      repository: "github.com/SpoungeAI/workflow-engine",
      visualAnalogy: "(Blueprint) 📜 -> [🧠 General Contractor] -> (Instructions) 🗣️ -> [👷 Subcontractor]",
      description:
        "The 'brain' of the operation. It orchestrates multi-step processes and uses AI agents to reason about which tools to use.",
      responsibilities: [
        "Ingest a user-defined workflow (e.g., a JSON or YAML graph) and execute its steps in sequence or in parallel.",
        "For dynamic tasks, instantiate an AI agent that can decide which tool to call next based on the current state and goal.",
        "Formulate a 'tool call' request (e.g., `{tool_name: \"llm-generate\", params: {...}}`) and send it via gRPC to `polykey-service`. It has no direct network access to any other tool or external API.",
        "Persist the state of long-running or conversational workflows to Redis.",
      ],
      dependencies: ["polykey-service", "state-management"],
      technologies: "TypeScript (Recommended), Go, or Python with LangChain/LangGraph.",
      ownershipAndOperations: {
        teamOwner: "Evan (TBD)",
        keyResponsibilities:
          "Developing new workflow nodes, improving agentic logic, monitoring execution latency and error rates.",
        deploymentStrategy:
          "Standard microservice CI/CD pipeline (GitHub Actions) that builds a Docker image and updates a Kubernetes manifest in the `spounge-infra` repo.",
        containerization:
          "Multi-stage Docker build with Node.js runtime. Deployed as Kubernetes StatefulSet for workflow state persistence. Uses persistent volumes for temporary workflow data.",
      },
      strategicOptions: [
        {
          name: "TypeScript with langchain-js",
          recommendation: true,
          summary:
            "Optimal for architectural consistency and team velocity. Aligns with existing TypeScript services. Node.js's non-blocking I/O model is perfectly suited for this orchestration workload.",
          pros: [
            "Excellent performance for I/O-bound tasks",
            "Unified backend stack (with other JS services)",
            "Mature and well-supported library.",
          ],
          cons: ["The JS library may occasionally lag slightly behind the Python version in bleeding-edge features."],
        },
        {
          name: "Python with langchain & langgraph",
          recommendation: false,
          summary:
            "To get access to the absolute latest AI orchestration ecosystem. Introduces a third language to the backend, increasing operational complexity.",
          pros: [
            "The original and most advanced library.",
            "Massive community and immediate access to all new features.",
          ],
          cons: [
            "Introduces a third language to the backend",
            "Python's concurrency model is less efficient for this task than Node.js or Go.",
          ],
        },
        {
          name: "Go with langchaingo (Custom Executor)",
          recommendation: false,
          summary:
            "To achieve the absolute maximum raw performance and concurrency, and to keep the entire backend stack in Go.",
          pros: [
            "Highest performance and throughput",
            "Lowest memory usage",
            "Operationally simple due to a single backend language.",
          ],
          cons: [
            "Highest development effort, as graph execution logic must be built manually.",
            "The underlying langchaingo library is a community port and will have the fewest features.",
          ],
        },
      ],
    },
    {
      id: "polykey-service",
      phase: 1,
      tags: [
        { name: "Security", color: "red" },
        { name: "Gateway", color: "purple" },
      ],
      repository: "github.com/SpoungeAI/polykey-service",
      visualAnalogy: "(Request Slip) 📝 -> [🚦 Secure Dispatcher] -> (Routes to Correct Dept) 🚚",
      description:
        "A hardened, minimal-privilege service whose sole purpose is to securely execute calls to external and internal tools.",
      responsibilities: [
        "Expose a single gRPC endpoint, `ExecuteTool`, that accepts a tool name and its parameters.",
        "Based on the tool name, query the `Key Vault` for the specific secret needed for that one operation.",
        "Introspect the `tool_name` to determine the downstream target and route the request.",
        "Ensure the fetched secret is cleared from memory as soon as the API call is complete.",
      ],
      dependencies: ["key-vault", "llm-provider-service", "vector-db-service", "external-apis"],
      technologies: "Go, gRPC.",
      ownershipAndOperations: {
        teamOwner: "Evan",
        keyResponsibilities:
          "Maintaining the routing logic, ensuring secure connection to the Key Vault, adding new tool integrations, security audits.",
        deploymentStrategy:
          "Highly controlled deployments. Requires security review and sign-off before any changes are rolled out via the standard CI/CD pipeline.",
        containerization:
          "Minimal Alpine-based Docker image with Go binary. Deployed as Kubernetes Deployment with strict security context. No root access, read-only filesystem, and network policies for Key Vault access only.",
      },
    },
    {
      id: "llm-provider-service",
      phase: 1,
      tags: [
        { name: "AI/ML", color: "orange" },
        { name: "Tool", color: "gray" },
      ],
      repository: "github.com/SpoungeAI/llm-provider-service",
      visualAnalogy: "(Standard Message) ✉️ -> [🌐 Multilingual Translator] -> (Specific Dialect) 🇮🇹 🇯🇵 🇪🇸",
      description:
        "A dedicated internal tool for abstracting away the complexities of different Large Language Models.",
      responsibilities: [
        "Provide a single, unified gRPC interface for making inference calls (`GenerateText`, `GenerateEmbedding`).",
        "Translate the standard internal request into the provider-specific format (OpenAI, Gemini, Anthropic, etc.).",
        "Handle provider-specific authentication headers and error-handling logic.",
      ],
      dependencies: ["external-apis"],
      technologies: "Go, gRPC.",
      ownershipAndOperations: {
        teamOwner: "Evan",
        keyResponsibilities:
          "Adding support for new LLM providers, optimizing model parameters, monitoring provider latency and error rates.",
        deploymentStrategy:
          "Standard microservice CI/CD pipeline. Can be deployed independently to add new models without affecting other systems.",
        containerization:
          "Go-based Docker image with multi-stage build. Kubernetes Deployment with configurable resource limits. Uses ConfigMaps for provider configurations and Secrets for API keys.",
      },
    },
    {
      id: "user-service",
      phase: 1,
      tags: [{ name: "Data", color: "green" }],
      repository: "github.com/SpoungeAI/user-service",
      visualAnalogy: "[🏨 Hotel Front Desk] -> (Guest Registry) 📖, (Safety Deposit Box List) 📋",
      description: "Manages all user-related data, including profiles and authentication information.",
      responsibilities: [
        "Handle user registration (hashing passwords) and login (issuing JWTs).",
        "Manage user data like email, name, subscription tier, etc.",
        "Store pointers to a user's secrets in the `Key Vault`.",
      ],
      dependencies: ["PostgreSQL Database"],
      technologies: "TypeScript, Node.js, Express/Fastify, Prisma ORM, gRPC.",
      ownershipAndOperations: {
        teamOwner: "Ryan",
        keyResponsibilities:
          "Managing the database schema, ensuring data privacy (PII), implementing new user-facing features.",
        deploymentStrategy:
          "Standard microservice CI/CD pipeline with an integrated database migration step (using Prisma Migrate).",
        containerization:
          "Node.js Docker image with TypeScript compilation. Kubernetes Deployment connected to PostgreSQL via service discovery. Uses init containers for database migrations.",
      },
    },
    {
      id: "key-vault",
      phase: 1,
      tags: [
        { name: "Security", color: "red" },
        { name: "Platform", color: "indigo" },
      ],
      repository: "N/A (External managed service). Configuration lives in spounge-infra.",
      visualAnalogy: "[🇨🇭 Swiss Bank Vault]",
      description: "A dedicated, external system for securely storing and controlling access to all secrets.",
      responsibilities: [
        "Encrypt and store secrets.",
        "Provide robust authentication and authorization for services.",
        "Generate detailed audit logs of all secret access.",
      ],
      dependencies: [],
      technologies: "HashiCorp Vault, AWS Key Management Service (KMS), Google Cloud Secret Manager.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities:
          "Managing IAM policies, rotating master keys, auditing access logs for suspicious activity.",
        deploymentStrategy:
          "Configuration managed via Terraform in the `spounge-infra` repo. Changes require security review.",
        containerization:
          "Managed service (HashiCorp Vault Cloud or AWS KMS). No direct containerization. Access via Kubernetes service accounts with RBAC policies.",
      },
    },
    {
      id: "state-management",
      phase: 1,
      tags: [
        { name: "Data", color: "green" },
        { name: "Platform", color: "indigo" },
      ],
      repository: "N/A (External managed service). Configuration lives in spounge-infra.",
      visualAnalogy: "[🧠 Short-Term Memory]",
      description: "A fast, in-memory data store used by the `workflow-engine` to track active workflow state.",
      responsibilities: [
        "Store conversation history for AI agents.",
        "Track workflow steps and intermediate data.",
        "Act as a high-performance cache.",
      ],
      dependencies: [],
      technologies: "Redis.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities: "Monitoring memory usage and latency, managing backups, planning for cluster scaling.",
        deploymentStrategy: "Provisioned and configured via Terraform in the `spounge-infra` repo.",
        containerization:
          "Redis deployed via Helm chart in Kubernetes. Uses persistent volumes for data durability. Configured with Redis Sentinel for high availability.",
      },
    },
    {
      id: "spounge-protos",
      phase: 1,
      tags: [{ name: "Contracts", color: "pink" }],
      repository: "github.com/SpoungeAI/spounge-protos",
      visualAnalogy: "[📜 Rosetta Stone]",
      description: "A central repository to store all `.proto` file definitions for your gRPC APIs.",
      responsibilities: ["Act as the single source of truth for all API contracts between microservices."],
      dependencies: [],
      technologies: "Protobuf, Buf CLI, Go & TypeScript code generation plugins.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities:
          "Managing the CI pipeline that generates and publishes language-specific client/server libraries, enforcing backward-compatibility rules.",
        deploymentStrategy:
          "Versioning is critical. New versions of the generated libraries are published as versioned packages (e.g., to GitHub Packages) when changes are merged.",
        containerization:
          "Build-time only containerization. Uses Docker for consistent protobuf compilation across environments. Generated artifacts are published to package registries.",
      },
    },
    {
      id: "external-apis",
      phase: 1,
      tags: [{ name: "Third-Party", color: "gray" }],
      repository: "N/A (Third-party).",
      visualAnalogy: "[🏭 Specialized Factories]",
      description: "Any third-party service that your platform integrates with.",
      responsibilities: ["Provide their own functionality (payment processing, messaging, LLM inference, etc.)."],
      dependencies: [],
      technologies: "Varies (Stripe, Slack, OpenAI, etc.).",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities: "N/A",
        deploymentStrategy: "N/A",
        containerization:
          "Third-party services, no containerization control. Integration handled through secure API calls with proper authentication and rate limiting.",
      },
    },
    {
      id: "service-mesh",
      phase: 2,
      tags: [
        { name: "Security", color: "red" },
        { name: "Platform", color: "indigo" },
      ],
      repository: "N/A (Infrastructure). Configuration lives in spounge-infra.",
      visualAnalogy: "[🛡️ Armored Convoy Escort]",
      description:
        "An infrastructure layer that manages all communication *between* services, enforcing a zero-trust security model.",
      responsibilities: [
        "Automatic mTLS encryption and authentication.",
        "Fine-grained access control.",
        "Deep observability (metrics, logs, traces).",
      ],
      dependencies: ["Wraps all internal services."],
      technologies: "Istio, Linkerd.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities:
          "Managing the lifecycle of the mesh, defining global traffic policies, providing dashboards and tools for other teams to observe their services.",
        deploymentStrategy: "Installed and configured via Helm charts in the `spounge-infra` repo.",
        containerization:
          "Istio/Linkerd control plane deployed as Kubernetes operators. Sidecar proxies automatically injected into application pods. Uses custom resource definitions for traffic management.",
      },
    },
    {
      id: "vector-db-service",
      phase: 2,
      tags: [
        { name: "AI/ML", color: "orange" },
        { name: "Data", color: "green" },
        { name: "Tool", color: "gray" },
      ],
      repository: "github.com/SpoungeAI/vector-db-service",
      visualAnalogy: "[📚 Library with a Perfect Index]",
      description:
        "Provides long-term memory and knowledge for AI agents through Retrieval-Augmented Generation (RAG).",
      responsibilities: [
        "Store and index text embeddings for efficient similarity search.",
        "Provide a query API for relevant context.",
      ],
      dependencies: [],
      technologies: "Pinecone, Weaviate, Qdrant.",
      ownershipAndOperations: {
        teamOwner: "Evan",
        keyResponsibilities:
          "Managing the data ingestion pipelines, optimizing indexing strategies, monitoring query performance and relevance.",
        deploymentStrategy:
          "If using a managed service, configuration is in `spounge-infra`. If self-hosting, it's a standard microservice CI/CD pipeline.",
        containerization:
          "If self-hosted: Vector database (Qdrant/Weaviate) deployed via Kubernetes StatefulSet with persistent storage. If managed: API client deployed as standard Kubernetes Deployment.",
      },
    },
    {
      id: "spounge-infra",
      phase: 2,
      tags: [{ name: "Platform", color: "indigo" }],
      repository: "github.com/SpoungeAI/spounge-infra",
      visualAnalogy: "[🏗️ Master Construction Plan]",
      description: "A dedicated repository for all Infrastructure-as-Code (IaC).",
      responsibilities: [
        "Define and provision cloud infrastructure (Kubernetes clusters, databases).",
        "Store Kubernetes manifests (Helm/Kustomize).",
        "Configure the service mesh.",
      ],
      dependencies: ["Manages all other services."],
      technologies: "Terraform, OpenTofu, Helm.",
      ownershipAndOperations: {
        teamOwner: "Developer TBD",
        keyResponsibilities:
          "Ensuring the reliability and security of the underlying platform, managing cloud costs, providing deployment tools for application teams.",
        deploymentStrategy:
          "Changes are applied via a GitOps workflow (e.g., a pull request to `main` triggers a Terraform/Helm apply job in CI/CD).",
        containerization:
          "Infrastructure as Code repository. Uses Docker containers for Terraform/Helm execution in CI/CD pipelines. Manages containerization policies and standards for all other services.",
      },
    },
  ],
}
