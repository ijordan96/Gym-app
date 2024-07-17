import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';
import { dataSource } from './data-source';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto : CreateUserDto):Promise<User | null>{
    const queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();
    var possibleError = null;
    var possibleNewUser = null;
    try {
      const newUser = new User() 
      newUser.name = createUserDto.name
      newUser.surname = createUserDto.surname
      newUser.age = createUserDto.age
      newUser.birthdate = createUserDto.birthdate
      newUser.joined= createUserDto.joined
      newUser.email =  createUserDto.email
      newUser.phoneNumber = createUserDto.phoneNumber
      possibleNewUser = await queryRunner.manager.save(newUser)
      await queryRunner.commitTransaction();
    } catch (error) {
      possibleError = error
      console.log(error)
      await queryRunner.rollbackTransaction();
    } finally{
      await queryRunner.release();
      if (possibleError) return null
      return possibleNewUser
    }
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}