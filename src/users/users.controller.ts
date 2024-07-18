import { Controller, Get, Post, Patch, Delete, Param, Inject, Body } from '@nestjs/common';
import { UsersService } from './users.service'
import { User } from './entity/User'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  createUser(@Body() createUserDto : CreateUserDto) : Promise<User | null>{
    const user = this.userService.createUser(createUserDto);
    return user
  }
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) : Promise<User | null> {
    const updatedUser = this.userService.updateUser(updateUserDto)
    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<boolean>{
    return this.userService.remove(id)
  }
}