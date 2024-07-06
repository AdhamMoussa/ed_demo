import { z } from 'zod'

const PaginatedOutputBaseSchema = z.object({
  count: z.number(),
  page: z.number(),
  limit: z.number(),
})

export const getPaginatedOutputSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  PaginatedOutputBaseSchema.extend({
    items: z.array(itemSchema),
  })

type PaginatedOutputBase = z.infer<typeof PaginatedOutputBaseSchema>

export interface PaginatedOutput<T extends object = object>
  extends PaginatedOutputBase {
  items: T[]
}
