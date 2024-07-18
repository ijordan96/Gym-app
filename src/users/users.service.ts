import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';
import { dataSource } from './data-source';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto : CreateUserDto):Promise<User | null>{
    try {
      const newUser = new User() 
      newUser.name = createUserDto.name
      newUser.surname = createUserDto.surname
      newUser.age = createUserDto.age
      newUser.birthdate = createUserDto.birthdate
      newUser.joined= createUserDto.joined
      newUser.email =  createUserDto.email
      newUser.phoneNumber = createUserDto.phoneNumber
      const savedUser = await this.usersRepository.save(newUser)
      return savedUser
    } catch (error) {
      console.log(error)
      return null
    } 
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    try{
      await this.usersRepository.delete(id);
      return true
    } catch(error){
      console.log(error)
      return false
    }
  }

  async updateUser( updateUserDto : UpdateUserDto) : Promise<User>{
    try {
      const updatedUser = await this.usersRepository.save(updateUserDto)
      return updatedUser
    } catch (error) {
      return error
    }
  }
}