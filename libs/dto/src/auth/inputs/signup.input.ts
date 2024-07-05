import { z } from 'zod'

export const signupInputSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, including one letter and one number',
  }),
})

export type SignupInput = z.infer<typeof signupInputSchema>
