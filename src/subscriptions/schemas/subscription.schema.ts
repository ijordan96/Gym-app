
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop()//We use prop for Schema Types options
  name: string;

  @Prop()
  value: number;

  @Prop()
  description: string;

}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
