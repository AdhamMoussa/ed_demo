import { z } from 'zod'

export const PaginatedInputSchema = z.object({
  page: z.number({ coerce: true }).optional(),
  limit: z.number({ coerce: true }).optional(),
})

export type PaginatedInput = z.infer<typeof PaginatedInputSchema>
