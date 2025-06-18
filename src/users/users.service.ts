import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
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

  async findOne(id: number): Promise<User | null> {
    return await this.usersModel.findById({ id });
  }

  async remove(id: number): Promise<boolean> {
    try{
      await this.usersModel.deleteOne({id});
      return true
    } catch(error){
      console.log(error)
      return false
    }
  }

  // async updateUser( updateUserDto : UpdateUserDto) : Promise<User>{
  //   try {
  //     const updatedUser = await this.usersModel(updateUserDto)
  //     return updatedUser
  //   } catch (error) {
  //     return error
  //   }
  // }
}