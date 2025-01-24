import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    // Comment out the TypeOrmModule
    // TypeOrmModule.forRoot({...}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
