import { Schema, model } from 'mongoose';
import { Address, User, UserFullName } from './user/user.interface';

const userFullNameSchema = new Schema<UserFullName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required '],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required '],
    trim: true,
  },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: [true, 'street is required '] },
  city: { type: String, required: [true, 'city is required '] },
  country: { type: String, required: [true, 'country is required '] },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'userId is required '],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'userName is required '],
    maxlength: [20, 'Name can not more than allowed length is 20'],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, 'password is required '] },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'fullName is required '],
  },
  age: { type: Number, required: [true, 'age is required '] },
  email: { type: String, required: [true, 'email is required '], unique: true },
  isActive: { type: Boolean, required: [true, 'isActive is required '] },
  hobbies: { type: [String], required: [true, 'hobbies is required '] },
  address: {
    type: addressSchema,
    required: [true, 'address is required '],
  },
});

export const UserModel = model<User>('User', userSchema);
