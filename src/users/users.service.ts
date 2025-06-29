import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
  ) {}

  async createUser(createUserDto : CreateUserDto):Promise<User | null>{
    try {
      const createdUser = new this.usersModel(createUserDto)
      createdUser.save()
      return createdUser
    } catch (error) {
      console.log("error")
      return null
    } 
  }
  async findAll(): Promise<User[]> {
    return await this.usersModel.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersModel.findById(id);
  }

  async remove(id: string): Promise<boolean> {
    try{
      const deletedUser = await this.usersModel.findByIdAndDelete(id);
      return !!deletedUser
    } catch(error){
      console.log(error)
      return false
    }
  }

  async updateUser( updateUserDto : UpdateUserDto) : Promise<User>{
    try {
      const updatedUser = await this.usersModel.findByIdAndUpdate(updateUserDto.id,updateUserDto)
      return updatedUser
    } catch (error) {
      return error
    }
  }
}