import { z } from 'zod'

import { getPaginatedOutputSchema } from '../../common/outputs/paginated.output'
import { employeeOutputSchema } from './employee.output'

export const employeesListOutputSchema =
  getPaginatedOutputSchema(employeeOutputSchema)

export type EmployeesListOutput = z.infer<typeof employeesListOutputSchema>
