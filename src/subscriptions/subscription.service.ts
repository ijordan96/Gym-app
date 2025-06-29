import { Injectable } from '@nestjs/common';
import { Subscription } from './schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/createSubsciption.dto';
import { UpdateSubscriptionDto } from './dto/updateSubscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionsModel: Model<Subscription>,
  ) {}

  async createSubscription(createSubscriptionDto : CreateSubscriptionDto):Promise<Subscription | null>{
    try {
      const createdSubscription = new this.subscriptionsModel(createSubscriptionDto)
      createdSubscription.save()
      return createdSubscription
    } catch (error) {
      console.log("error")
      return null
    } 
  }
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsModel.find();
  }

  async findOne(id: string): Promise<Subscription | null> {
    return await this.subscriptionsModel.findById(id);
  }

  async deleteSubscription(id: string): Promise<boolean> {
    try{
      const deletedSubscription = await this.subscriptionsModel.findByIdAndDelete(id);
      return !!deletedSubscription
    } catch(error){
      console.log(error)
      return false
    }
  }

  async updateSubscription( updateSubscriptionDto : UpdateSubscriptionDto) : Promise<Subscription>{
    try {
      const subscritpion = await this.subscriptionsModel.findByIdAndUpdate(updateSubscriptionDto.id, updateSubscriptionDto, { new: true })
      return subscritpion
    } catch (error) {
      return error
    }
  }
}