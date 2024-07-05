import { ArgumentMetadata, UsePipes, applyDecorators } from '@nestjs/common'
import { z } from 'zod'

import { ValidationPipe } from '../pipes/validation.pipe'

export const Validate = (
  schema: z.ZodTypeAny,
  type: ArgumentMetadata['type'] = 'body',
) => applyDecorators(UsePipes(new ValidationPipe(schema, type)))
