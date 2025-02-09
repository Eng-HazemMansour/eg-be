import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document; // Ensure _id is included

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  _id: Types.ObjectId; // Explicitly declare _id
}

export const UserSchema = SchemaFactory.createForClass(User);
