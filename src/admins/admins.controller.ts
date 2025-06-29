import { Controller, Get, Post, Patch, Delete, Param, Inject, Body, UseGuards, Query, NotFoundException, HttpCode } from '@nestjs/common';
import { AdminsService } from './admins.service'
import { CreateAdminDto } from './dto/createAdmin.dto';
import { Admin } from './schemas/admins.schema';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService:AdminsService) {}
  @Get()
  async findAdmins(@Query('email') email: string): Promise<Admin[] | Admin> {
    if (email) {
      const admin = this.adminService.findByEmail(email);
      return admin
    }
    const admins = this.adminService.findAll();
    return admins
  }

  @UseGuards(AuthGuard)
  @Post()
  async createAdmin(@Body() createAdminDto : CreateAdminDto) : Promise<Admin | null>{
    const admin = await this.adminService.createAdmin(createAdminDto);
    return admin
  }
  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() updateAdminDto: UpdateAdminDto) : Promise<Admin | null> {
    const updatedAdmin = await this.adminService.updateAdmin(updateAdminDto)
    return updatedAdmin;
  }
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete('')
  async remove(@Query('id') id: string) : Promise<void>{
    const deletedAdmin = await this.adminService.deleteAdmin(id)
    if(!deletedAdmin) throw new NotFoundException();
  }
}