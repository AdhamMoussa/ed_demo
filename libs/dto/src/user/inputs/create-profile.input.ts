import { z } from 'zod'

export const createProfileInputSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, { message: 'First name must have at least 2 characters' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, { message: 'Last name must have at least 2 characters' }),
})

export type CreateProfileInput = z.infer<typeof createProfileInputSchema>
