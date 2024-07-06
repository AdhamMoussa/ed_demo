import { z } from 'zod'

export const createOrgInputSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  slug: z
    .string({ required_error: 'Slug is required' })
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with no spaces'),
  currencyCode: z
    .string({ required_error: 'Currency is required' })
    .min(1, 'Currency is required'),
})

export type CreateOrgInput = z.infer<typeof createOrgInputSchema>
