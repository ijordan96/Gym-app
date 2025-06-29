import { Controller, Get, Post, Patch, Delete, Param, Inject, Body, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service'
import { CreateSubscriptionDto } from './dto/createSubsciption.dto';
import { Subscription } from './schemas/subscription.schema';
import { UpdateSubscriptionDto } from './dto/updateSubscription.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly SubscriptionService:SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Get()
  async returnSubscriptions(@Query('id') id: string): Promise<Subscription[] | Subscription> {
    if(id){
      const subscription = this.SubscriptionService.findOne(id);
      return subscription
    }
    const subscriptions = this.SubscriptionService.findAll();
    return subscriptions
  }
  

  @UseGuards(AuthGuard)
  @Post()
  async createSubscription(@Body() createSubscriptionDto : CreateSubscriptionDto) : Promise<Subscription | null>{
    const subscription = await this.SubscriptionService.createSubscription(createSubscriptionDto);
    return subscription
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateSubscription(@Body() updateSubscriptionDto: UpdateSubscriptionDto) : Promise<Subscription | null> {
    const updatedSubcription = await this.SubscriptionService.updateSubscription(updateSubscriptionDto)
    return updatedSubcription;
  }

  @UseGuards(AuthGuard)  
  @Delete('')
  async deleteSubscription(@Query('id') id: string) : Promise<void>{
    const deletedSubscription = await this.SubscriptionService.deleteSubscription(id)
    if(!deletedSubscription) throw new NotFoundException();
  }
}