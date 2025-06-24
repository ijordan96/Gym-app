import { Controller, Get, Post, Patch, Delete, Param, Inject, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service'
import { CreateSubscriptionDto } from './dto/createSubsciption.dto';
import { Subscription } from './schemas/subscription.schema';
import { UpdateSubscriptionDto } from './dto/updateSubscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly SubscriptionService:SubscriptionService) {}
  @Get()
  findAll(): Promise<Subscription[]> {
    const users = this.SubscriptionService.findAll();
    return users
  }
  @Get(':id')
  findOne(@Param('id') id: number) : Promise<Subscription | null> {
    const user = this.SubscriptionService.findOne(id);
    return user
  }
  @Post()
  createSubscription(@Body() createSubscriptionDto : CreateSubscriptionDto) : Promise<Subscription | null>{
    const user = this.SubscriptionService.createSubscription(createSubscriptionDto);
    return user
  }
  @Patch()
  update(@Body() updateSubscriptionDto: UpdateSubscriptionDto) : Promise<Subscription | null> {
    const updatedUser = this.SubscriptionService.updateUser(updateSubscriptionDto)
    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<boolean>{
    return this.SubscriptionService.remove(id)
  }
}