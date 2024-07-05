import helmet from 'helmet'
import morgan from 'morgan'

import { INestApplication, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const setupMiddlewares = (app: INestApplication) => {
  const configService = app.get(ConfigService)
  const FRONTEND_URL = configService.get('FRONTEND_URL')

  app.use(helmet())
  app.use(morgan('dev'))

  app.enableCors({
    origin: [FRONTEND_URL],
  })

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
}
