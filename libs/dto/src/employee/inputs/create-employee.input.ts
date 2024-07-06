import { z } from 'zod'

export const createEmployeeInputSchema = z.object({
  staffId: z
    .string({ required_error: 'Staff ID is required' })
    .min(1, 'Staff ID is required'),
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  basicSalary: z
    .number({ required_error: 'Basic salary is required' })
    .gt(0, 'Basic salary must be greater than 0'),
  allowances: z
    .array(
      z.object({
        name: z
          .string({ required_error: 'Allowance name is required' })
          .min(1, { message: 'Allowance name is required' }),
        amount: z
          .number({ required_error: 'Amount is required' })
          .gt(0, 'Amount must be greater than 0'),
      }),
    )
    .optional(),
  joinedAt: z
    .string({ required_error: 'Joining date is required' })
    .datetime('Invalid date'),
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeInputSchema>
