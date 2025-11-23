
export interface IUser {
    _id: any | string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: Date;
}