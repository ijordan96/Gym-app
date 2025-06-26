import { Controller, Get, Post, Patch, Delete, Param, Inject, Body, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service'
import { CreateAdminDto } from './dto/createAdmin.dto';
import { Admin } from './schemas/admins.schema';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService:AdminsService) {}
  @Get()
  findAll(): Promise<Admin[]> {
    const users = this.adminService.findAll();
    return users
  }
  @Get(':email')
  findOne(@Param('email') email: string) : Promise<Admin | null> {
    const user = this.adminService.findByEmail(email);
    return user
  }
  @UseGuards(AuthGuard)
  @Post()
  createAdmin(@Body() createUserDto : CreateAdminDto) : Promise<Admin | null>{
    const user = this.adminService.createAdmin(createUserDto);
    return user
  }
  @Patch()
  update(@Body() updateAdminDto: UpdateAdminDto) : Promise<Admin | null> {
    const updatedAdmin = this.adminService.updateAdmin(updateAdminDto)
    return updatedAdmin;
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<boolean>{
    return this.adminService.remove(id)
  }
}