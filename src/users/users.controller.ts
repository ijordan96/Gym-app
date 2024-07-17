import { Controller, Get, Post, Patch, Delete, Param, Inject, Body } from '@nestjs/common';
import { UsersService } from './users.service'
import { User } from './entity/User'
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsersService) private readonly userService:UsersService
  ) {}
  @Get()
  findAll(): Promise<User[]> {
    const users = this.userService.findAll();
    return users
  }
  @Get(':id')
  findOne(@Param('id') id: number) : Promise<User | null> {
    const user = this.userService.findOne(id);
    return user
  }
  @Post()
  async createUser(@Body() createUserDto : CreateUserDto) : Promise<User | null>{
    const user = await this.userService.createUser(createUserDto);
    return user
  }
  @Patch(':id')
  update(@Param('id') id: number) {
    return 'This action updates an existing users';
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return 'this deletes an existing user'
  }
}