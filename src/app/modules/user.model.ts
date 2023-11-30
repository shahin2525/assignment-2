import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrder,
  TUser,
  TUserFullName,
  UserMethods,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userFullNameSchema = new Schema<TUserFullName>({
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

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'street is required '] },
  city: { type: String, required: [true, 'city is required '] },
  country: { type: String, required: [true, 'country is required '] },
});
const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const userSchema = new Schema<TUser, UserModel, UserMethods>({
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
  password: {
    type: String,
    required: [true, 'password is required '],
    maxlength: [20, 'password can not be more than 20 characters'],
  },
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
  orders: { type: [orderSchema], default: [] },
  isDeleted: { type: Boolean, default: false },
});

// pre middleware hook for using implement bcrypt
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// post middleware hook
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

// query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating statics method

// userSchema.methods.isUserExist = async function (userId: number) {
//   const userExist = await User.findOne({ userId });
//   return userExist;
// };
userSchema.methods.isOrderExist = async function (userId: number) {
  const orderExist = await User.findOne({ userId });
  return orderExist;
};

export const User = model<TUser, UserModel>('User', userSchema);
