import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/User';
import { controllers } from './auxiliary/controllers';
import { services } from './auxiliary/services';
import { modules } from './auxiliary/modules';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'nest',
    entities: [User],
    synchronize: true,
  })
  ,...modules
],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
