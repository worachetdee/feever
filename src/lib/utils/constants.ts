import type { Category, CompatibilityTag, QualityTier } from "@/types";

export const CATEGORIES: Record<Category, { label: string; description: string }> = {
  starter: {
    label: "AI-Ready Starters",
    description: "Scaffolded codebases optimized for AI-assisted continuation",
  },
  workflow_kit: {
    label: "AI Workflow Kits",
    description: "Multi-step prompt systems that produce repeatable, professional results",
  },
  extension: {
    label: "AI Extensions",
    description: "Plug-and-play capabilities for AI tools — MCP servers, skills, and configs",
  },
  launchable: {
    label: "Launchables",
    description: "Complete, deployed products you can customize and own",
  },
  context_pack: {
    label: "Context Packs",
    description: "Domain-specific knowledge bundles that make AI an expert",
  },
  blueprint: {
    label: "Automation Blueprints",
    description: "Tested multi-step pipelines connecting AI tools, APIs, and services",
  },
};

export const LAUNCH_CATEGORIES: Category[] = ["starter", "workflow_kit", "extension"];

export const COMPATIBILITY_TAGS: Record<CompatibilityTag, { label: string; icon: string }> = {
  "claude_4.5": { label: "Claude 4.5", icon: "anthropic" },
  claude_4: { label: "Claude 4", icon: "anthropic" },
  "gpt_4.5": { label: "GPT-4.5", icon: "openai" },
  gpt_4: { label: "GPT-4", icon: "openai" },
  gemini_2: { label: "Gemini 2", icon: "google" },
  cursor: { label: "Cursor", icon: "cursor" },
  windsurf: { label: "Windsurf", icon: "windsurf" },
  v0: { label: "v0", icon: "vercel" },
  bolt: { label: "Bolt", icon: "bolt" },
  lovable: { label: "Lovable", icon: "lovable" },
  replit: { label: "Replit", icon: "replit" },
};

export const QUALITY_TIERS: Record<QualityTier, { label: string; color: string }> = {
  unverified: { label: "Unverified", color: "gray" },
  verified: { label: "Verified", color: "blue" },
  pick: { label: "feever Pick", color: "orange" },
  gold: { label: "feever Gold", color: "amber" },
};

export const PLATFORM_FEE_PCT = {
  free: 20,
  pro: 12,
  team: 8,
} as const;
