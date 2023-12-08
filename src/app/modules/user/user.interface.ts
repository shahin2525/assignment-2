import { Model } from 'mongoose';
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
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
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: [TOrder];
};

// creating methods

export type UserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: number): Promise<TUser | null>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserModel = Model<TUser, {}, UserMethods>;
