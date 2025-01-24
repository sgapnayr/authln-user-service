import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Mocking database for now
    // TypeOrmModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
