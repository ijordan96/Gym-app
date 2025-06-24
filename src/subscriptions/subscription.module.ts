import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }])],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports: [MongooseModule]
})
export class SubscriptionsModule {}