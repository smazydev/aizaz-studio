export interface ServiceCapabilityLink {
  label: string;
  href: string;
}

/**
 * Curated destinations for capability cards that have a genuine next step.
 * Labels intentionally match the capability copy in Sanity. If an editor
 * changes or reorders a capability, an outdated link will not be applied.
 */
export const serviceCapabilityLinks: Record<string, ServiceCapabilityLink[]> = {
  'ai-agent-development': [
    { label: 'Tool use integrations with CRM, ERP, and internal APIs', href: '/services/api-integration' },
    { label: 'Retrieval augmented generation with your business data', href: '/services/llm-app-development' },
    { label: 'Human in the loop approval and escalation flows', href: '/services/ai-workflow-automation' },
  ],
  'ai-automation-systems': [
    { label: 'AI agents and internal assistants', href: '/services/ai-agent-development' },
    { label: 'Website and WhatsApp chatbots', href: '/services/ai-chatbot-development' },
    { label: 'Workflow automations with CRM, email, and APIs', href: '/services/ai-workflow-automation' },
  ],
  'ai-chatbot-development': [
    { label: 'Knowledge base and document grounded responses', href: '/services/llm-app-development' },
    { label: 'Lead capture, qualification, and CRM sync', href: '/services/crm-integration' },
    { label: 'Support ticket creation and agent handoff', href: '/services/api-integration' },
  ],
  'ai-integration': [
    { label: 'LLM and model APIs integrated into existing products and internal systems', href: '/services/llm-app-development' },
    { label: 'Tool and API access with explicit permissions and action boundaries', href: '/services/api-integration' },
    { label: 'Human approval and escalation for high-impact actions', href: '/services/ai-workflow-automation' },
  ],
  'ai-workflow-automation': [
    { label: 'Multi step workflow design and orchestration', href: '/services/business-process-automation' },
    { label: 'CRM, ERP, email, and messaging integrations', href: '/services/api-integration' },
    { label: 'Error handling, retry logic, and ops dashboards', href: '/services/backend-engineering' },
  ],
  'api-integration': [
    { label: 'REST, GraphQL, and SOAP API integrations', href: '/services/backend-engineering' },
    { label: 'OAuth, signed requests, API keys, token rotation, and least-privilege access', href: '/security' },
    { label: 'Partner-facing APIs, webhooks, documentation, and test environments', href: '/services/b2b-saas-development' },
  ],
  'aws-cloud-engineering': [
    { label: 'EC2, ECS, and Lambda deployment patterns', href: '/services/devops-consulting' },
    { label: 'Infrastructure as code with Terraform or CloudFormation', href: '/services/platform-engineering' },
    { label: 'Cost optimization and reserved capacity planning', href: '/services/aws-devops' },
  ],
  'aws-devops': [
    { label: 'AWS architecture and deployment', href: '/services/aws-cloud-engineering' },
    { label: 'CI/CD pipelines (GitHub Actions, etc.)', href: '/services/devops-consulting' },
    { label: 'Monitoring, alerting, and logging', href: '/services/platform-engineering' },
  ],
  'b2b-saas-development': [
    { label: 'Multi tenant architecture and data isolation', href: '/services/backend-engineering' },
    { label: 'Subscription billing and usage based pricing', href: '/services/web-app-saas-development' },
    { label: 'Public API and webhook integrations', href: '/services/api-integration' },
  ],
  'backend-engineering': [
    { label: 'REST and GraphQL API design and implementation', href: '/services/api-integration' },
    { label: 'Authentication, authorization, and session management', href: '/services/b2b-saas-development' },
    { label: 'Third party API integrations and webhooks', href: '/services/api-integration' },
  ],
  'business-process-automation': [
    { label: 'CRM and pipeline automations', href: '/services/crm-integration' },
    { label: 'WhatsApp and messaging integrations', href: '/services/ai-chatbot-development' },
    { label: 'Internal portal and API orchestration', href: '/services/web-app-saas-development' },
  ],
  'cloud-migration': [
    { label: 'Migration readiness assessment and dependency mapping', href: '/services/technical-audit' },
    { label: 'Application containerization and replatforming', href: '/services/devops-consulting' },
    { label: 'Post migration performance tuning and cost review', href: '/services/aws-cloud-engineering' },
  ],
  'crm-integration': [
    { label: 'Lead capture from web forms, chat, and ads', href: '/services/ai-chatbot-development' },
    { label: 'Product usage and billing data in CRM records', href: '/services/api-integration' },
    { label: 'Workflow triggers and sales automation hooks', href: '/services/business-process-automation' },
  ],
  'devops-consulting': [
    { label: 'CI/CD pipeline design and implementation', href: '/services/aws-devops' },
    { label: 'Monitoring, alerting, and on call runbooks', href: '/services/platform-engineering' },
    { label: 'Secrets management and environment configuration', href: '/services/aws-cloud-engineering' },
  ],
  'llm-app-development': [
    { label: 'Custom LLM application architecture', href: '/blog/custom-ai-development' },
    { label: 'Retrieval augmented generation and vector search', href: '/blog/ai-integration-existing-software' },
    { label: 'Streaming UI and conversation interfaces', href: '/services/ai-chatbot-development' },
  ],
  'netsuite-erp-automation': [
    { label: 'NetSuite REST and SuiteScript workflows', href: '/services/netsuite-integration' },
    { label: 'Shopify, CRM, and 3PL integrations', href: '/services/netsuite-integration' },
    { label: 'Error alerting and retry workflows', href: '/services/api-integration' },
  ],
  'netsuite-integration': [
    { label: 'BigCommerce, Shopify, CRM, 3PL, warehouse, and custom-system integration', href: '/integrations/netsuite-bigcommerce' },
    { label: 'Middleware and queues for long-running or multi-system workflows', href: '/services/api-integration' },
    { label: 'Migration, recovery, and stabilization of unreliable integrations', href: '/services/project-rescue' },
  ],
  'platform-engineering': [
    { label: 'Environment provisioning and ephemeral previews', href: '/services/aws-cloud-engineering' },
    { label: 'Standardized CI/CD templates and deploy policies', href: '/services/devops-consulting' },
    { label: 'Security policies and compliance guardrails', href: '/security' },
  ],
  'project-rescue': [
    { label: 'Codebase audit and risk assessment', href: '/services/technical-audit' },
    { label: 'Deployment pipeline and CI/CD restoration', href: '/services/devops-consulting' },
    { label: 'Database and API reliability improvements', href: '/services/backend-engineering' },
  ],
  'saas-mvp-development': [
    { label: 'User authentication and onboarding flows', href: '/services/web-app-saas-development' },
    { label: 'REST or GraphQL API foundations', href: '/services/backend-engineering' },
    { label: 'AWS deployment with CI/CD and monitoring', href: '/services/aws-devops' },
  ],
  'technical-audit': [
    { label: 'Cloud infrastructure and cost review', href: '/services/aws-cloud-engineering' },
    { label: 'CI/CD and deployment reliability audit', href: '/services/devops-consulting' },
    { label: 'Third party integration and data flow mapping', href: '/services/api-integration' },
  ],
  'trading-technology-systems': [
    { label: 'Trading and portfolio dashboards', href: '/services/web-app-saas-development' },
    { label: 'MT5 and TradingView integrations', href: '/services/api-integration' },
    { label: 'Risk monitoring and alert workflows', href: '/services/business-process-automation' },
  ],
  'web-app-saas-development': [
    { label: 'MVPs and full SaaS platforms', href: '/services/saas-mvp-development' },
    { label: 'Admin and customer portals', href: '/services/b2b-saas-development' },
    { label: 'REST and GraphQL APIs with scalable backends', href: '/services/backend-engineering' },
  ],
};
