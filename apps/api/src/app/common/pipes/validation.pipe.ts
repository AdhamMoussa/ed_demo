import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { z } from 'zod'

import { CustomHttpException } from '../CustomHttpException'

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: z.ZodTypeAny,
    private readonly type: ArgumentMetadata['type'] = 'body',
  ) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== this.type) return value

    const result = await this.schema.safeParseAsync(value)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'Validation failed',
        fields: errors,
      })
    }

    return result.data
  }
}
