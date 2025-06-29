import { Controller, Get, Post, Patch, Delete, Query, Inject, Body, Res, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService:UsersService) {}
  @Get()
  async returnUser(@Query('id') id: string): Promise<User[] | User> {
    if (id) {
      const user = await this.userService.findOne(id);
      return user
    } else {
      const users = await this.userService.findAll();
      return users

    }
  }

  @Post()
  async createUser(@Body() createUserDto : CreateUserDto) : Promise<User | null>{
    const user = await this.userService.createUser(createUserDto);
    return user
  }
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) : Promise<User | null> {
    const updatedUser = await this.userService.updateUser(updateUserDto)
    return updatedUser;
  }

  @Delete('')
  async remove(@Query('id') id: string): Promise<void>{
    const deleted = await this.userService.remove(id)
    if (!deleted) {
      throw new NotFoundException();
    }
  }
}