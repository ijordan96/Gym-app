import { Injectable } from '@nestjs/common';
import { Admin } from './schemas/admins.schema';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name)
    private adminsModel: Model<Admin>,
  ) {}

  async createAdmin(createAdminDto : CreateAdminDto):Promise<Admin | null>{
    try {
      const createdAdmin = new this.adminsModel(createAdminDto)
      createdAdmin.save()
      return createdAdmin
    } catch (error) {
      console.log("error")
      return null
    } 
  }
  async findAll(): Promise<Admin[]> {
    return await this.adminsModel.find();
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return await this.adminsModel.findOne({ email });
  }

  async remove(id: string): Promise<boolean> {
    try{
      await this.adminsModel.findByIdAndDelete({id});
      return true
    } catch(error){
      console.log(error)
      return false
    }
  }

  async updateAdmin( updateAdminDto : UpdateAdminDto) : Promise<Admin>{
    try {
      const updatedAdmin = await this.adminsModel.findByIdAndUpdate(updateAdminDto.id, updateAdminDto, { new: true })
      return updatedAdmin
    } catch (error) {
      return error
    }
  }
}