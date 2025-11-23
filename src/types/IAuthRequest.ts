import { Request } from 'express';
import type { IUser } from './IUser';

export interface IAuthRequest extends Request {
  user?: IUser;
}