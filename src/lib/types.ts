export type AgentFormData = {
  // General tab
  image: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  tags: string;

  // Instructions tab
  engagementHooks: string;
  engagementRules: string;
  ethicalBoundaries: string;
  factCheckThreshold: number;
  tone: number;
  style: number;
  stance: number;

  // Context tab
  context: string;

  // Settings tab
  isPublic: boolean;
  model: string;
}