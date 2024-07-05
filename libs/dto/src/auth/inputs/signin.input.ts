import { z } from 'zod'

export const signinInputSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
})

export type SigninInput = z.infer<typeof signinInputSchema>
