import { Profile, User as DBUser, Organization } from '@prisma/client'

export type AuthUser = DBUser & {
  profile: Profile | null
  organization: Organization | null
}

declare global {
  namespace Express {
    interface User extends AuthUser {}

    interface Request {
      user: User | null
    }
  }
}
