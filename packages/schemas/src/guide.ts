import { z } from 'zod'

// A guide starts as an empty draft and is fleshed out in the editor, so
// every field is optional; knowledge_type defaults to theory.
export const createGuideSchema = z.object({
  title: z.string().trim().max(200).nullish(),
  knowledge_type: z.enum(['theory', 'practice']).default('theory'),
  summary: z.string().trim().max(500).nullish(),
  body: z.string().trim().nullish(),
})

export type CreateGuideInput = z.infer<typeof createGuideSchema>

// For adding a variant (a method/alternative) under an existing guide. Unlike a newly
// created guide, a variant already has a title, but summary/body stay optional.
export const createVariantSchema = z.object({
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().max(500).nullish(),
  body: z.string().trim().nullish(),
})

export type CreateVariantInput = z.infer<typeof createVariantSchema>
