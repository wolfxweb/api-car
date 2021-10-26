import {User} from './src/users/usersModel'

declare module 'restify' {
  export interface Request {
    authenticated: User
  }
}