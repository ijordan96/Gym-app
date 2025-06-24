import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { controllers } from './auxiliary/controllers';
import { services } from './auxiliary/services';
import { modules } from './auxiliary/modules';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ignaciojordan96:test1234@nesttest.n5u21es.mongodb.net/gymapp',
      {
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('connected'));
          connection.on('open', () => console.log('open'));
          connection.on('disconnected', () => console.log('disconnected'));
          connection.on('reconnected', () => console.log('reconnected'));
          connection.on('disconnecting', () => console.log('disconnecting'));

          return connection;
        },}
    )
    ,...modules, AuthModule
  ],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
