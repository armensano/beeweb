import { Document } from 'mongoose';

export class User extends Document {
  email: string;
  password: string;
  image: string;
}
