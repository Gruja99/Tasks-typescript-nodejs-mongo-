import { Schema, model } from 'mongoose';
import type { ISong } from '../interface';
const SongSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: Array,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    dislikedBy: {
      type: Array,
    },
    file: {
      type: String,
      data: Buffer,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    strict: false,
  },
);

const Song = model<ISong>('Song', SongSchema);
export { Song };
