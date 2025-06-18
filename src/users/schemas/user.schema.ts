
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()//We use prop for Schema Types options
  name: string;

  @Prop()
  age: number;

  @Prop()
  surname: string;

  @Prop()
  birthdate: Date;

  @Prop()
  joined: Date;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
