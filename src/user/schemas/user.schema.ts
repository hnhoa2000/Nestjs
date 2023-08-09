import { Schema, Document } from 'mongoose';
import { Role, Gender } from 'src/common/enum';

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, require: true },
    gender: { type: String, enum: Object.values(Gender) },
    password: { type: String, require: true },
    refreshToken: String,
    address: String,
    phone: String,
    roles: {
      type: [Number],
      enum: Object.values(Role).filter((value) => typeof value === 'number'),
      default: Role.USER,
    },
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
  roles: Role[],
  Fpoint: Number
}
