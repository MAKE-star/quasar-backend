import { User } from '../entities/user.entities';

declare module 'express' {
  interface Request {
    user?: Partial<User>
  }
}
