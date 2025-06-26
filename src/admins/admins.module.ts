import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsService } from './admins.service';
import { AdminController } from './admins.controller';
import { Admin, AdminSchema } from './schemas/admins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [AdminsService],
  controllers: [AdminController],
  exports: [MongooseModule,AdminsService]
})
export class AdminsModule {}