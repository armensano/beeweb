import { Document } from 'mongodb';
import { Types } from 'mongoose';

export class Channel extends Document {
  name: string;
  userId!: Types.ObjectId;
}
