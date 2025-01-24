import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [], // Add imported modules here if needed
  controllers: [AppController, UsersController], // Register controllers
  providers: [AppService, UsersService], // Register services
})
export class AppModule {}
