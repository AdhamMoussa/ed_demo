import { z } from 'zod'

export const salaryPaymentSchema = z.object({
  employeeId: z
    .string({ required_error: 'Employee ID is required' })
    .min(1, 'Employee ID is required'),
  basicSalary: z
    .number({ required_error: 'Basic Salary is required' })
    .gt(0, 'Basic Salary must be greater than 0'),
  allowances: z.number(),
  additions: z.number(),
  deductions: z.number(),
  month: z
    .string({ required_error: 'Month is required' })
    .datetime({ message: 'Invalid month' }),
  isGratuity: z.boolean().optional(),
})

export const salaryPaymentsInputSchema = z.object({
  payments: z.array(salaryPaymentSchema),
})

export type SalaryPayment = z.infer<typeof salaryPaymentSchema>
export type SalaryPaymentsInput = z.infer<typeof salaryPaymentsInputSchema>
