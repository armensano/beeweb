import { Document } from 'mongodb';
import { Types } from 'mongoose';

export class Workspace extends Document {
  name!: string;
  users!: Types.ObjectId[];
  slag!: string;
  channels!: Types.ObjectId[];
}
