import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
};

// creating methods

export type UserMethods = {
  isOrderExist(id: number): Promise<TUser | null>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserModel = Model<TUser, {}, UserMethods>;
