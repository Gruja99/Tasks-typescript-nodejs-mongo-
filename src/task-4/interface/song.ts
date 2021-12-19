import type { Document } from 'mongoose';

export interface ISong extends Document {
  name: string;
  likes: number;
  likedBy: string[];
  dislikes: number;
  dislikedBy: string[];
  file: string;
}
