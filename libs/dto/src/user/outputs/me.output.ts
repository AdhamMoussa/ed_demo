import { z } from 'zod'

const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const organizationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  currency: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
})

export const meOutputSchema = z.object({
  id: z.string(),
  email: z.string(),
  profile: profileSchema.nullable(),
  organization: organizationSchema.nullable(),
})

export type MeOutput = z.infer<typeof meOutputSchema>
