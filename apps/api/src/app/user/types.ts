import { Profile, User as DBUser, Organization, Currency } from '@prisma/client'

export type AuthUser = DBUser & {
  profile: Profile | null
  organization:
    | (Organization & {
        currency: Currency
      })
    | null
}

declare global {
  namespace Express {
    interface User extends AuthUser {}

    interface Request {
      user: User | null
    }
  }
}
