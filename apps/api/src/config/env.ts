import * as Joi from 'joi'

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8000),
  FRONTEND_URL: Joi.string().required(),

  // Databases
  DATABASE_URL: Joi.string().required(),
})
