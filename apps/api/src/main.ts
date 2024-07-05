import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

import { AppModule } from './app/app.module'

import { setupMiddlewares } from './config/middlewares'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })

  // middlewares
  setupMiddlewares(app)

  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  app.setGlobalPrefix('api')

  await app.listen(PORT, () => {
    Logger.log(`Server running on port ${PORT}`)
  })
}

bootstrap()
