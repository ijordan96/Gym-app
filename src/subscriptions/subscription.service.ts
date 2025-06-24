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
      // const newUser = new User() 
      // newUser.name = createUserDto.name
      // newUser.surname = createUserDto.surname
      // newUser.age = createUserDto.age
      // newUser.birthdate = createUserDto.birthdate
      // newUser.joined= createUserDto.joined
      // newUser.email =  createUserDto.email
      // newUser.phoneNumber = createUserDto.phoneNumber
      // const savedUser = await this.usersModel.save(newUser)
      // return savedUser
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

  async findOne(id: number): Promise<Subscription | null> {
    return await this.subscriptionsModel.findById({ id });
  }

  async remove(id: number): Promise<boolean> {
    try{
      await this.subscriptionsModel.deleteOne({id});
      return true
    } catch(error){
      console.log(error)
      return false
    }
  }

  async updateUser( updateSubscriptionDto : UpdateSubscriptionDto) : Promise<Subscription>{
    try {
      const subscritpion = await this.subscriptionsModel.findByIdAndUpdate(updateSubscriptionDto.id, updateSubscriptionDto, { new: true })
      return subscritpion
    } catch (error) {
      return error
    }
  }
}