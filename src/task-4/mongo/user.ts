import { Schema, model } from 'mongoose';
import type { IUser } from '../interface';
const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  },
);

const User = model<IUser>('User', UserSchema);

export { User };
