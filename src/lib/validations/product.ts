import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  description_md: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  short_description: z
    .string()
    .max(160, "Short description must be under 160 characters")
    .optional()
    .or(z.literal("")),
  category: z.enum([
    "starter",
    "workflow_kit",
    "extension",
    "launchable",
    "context_pack",
    "blueprint",
  ]),
  price: z
    .number()
    .int("Price must be a whole number of cents")
    .min(100, "Minimum price is $1.00")
    .max(99900, "Maximum price is $999.00"),
  license_type: z.enum(["personal", "commercial", "team"]).default("personal"),
  compatibility_tags: z
    .array(
      z.enum([
        "claude_4.5",
        "claude_4",
        "gpt_4.5",
        "gpt_4",
        "gemini_2",
        "cursor",
        "windsurf",
        "v0",
        "bolt",
        "lovable",
        "replit",
      ]),
    )
    .default([]),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
