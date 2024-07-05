import { z } from 'zod'

export const signupInputSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, { message: 'Password is required' })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{12,}$/,
        {
          message:
            'Password must have at least 12 characters, one lowercase, one uppercase, one digit, one special character.',
        },
      ),
    passwordConfirmation: z
      .string({
        required_error: 'Password confirmation is required',
      })
      .min(1, { message: 'Password confirmation is required' }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

export type SignupInput = z.infer<typeof signupInputSchema>
