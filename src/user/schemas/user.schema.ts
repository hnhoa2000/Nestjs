import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, require: true },
    gender: String,
    password: { type: String, require: true },
    refreshToken: String,
    address: String,
    phone: String,
    role: String,
    Fpoint: Number
  },
  {
    collection: 'users',
  },
);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export { UserSchema };

export interface User extends Document {
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  password: string,
  refreshToken: string,
  address: string,
  phone: string,
  role: string,
  Fpoint: Number
}
