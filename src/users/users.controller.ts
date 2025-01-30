import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post()
  createUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(username, email, password);
  }

  @Put(':id/btc')
  updateBTCAddress(
    @Param('id') id: string,
    @Body('btcAddress') btcAddress: string,
  ) {
    return this.usersService.updateBTCAddress(id, btcAddress);
  }

  @Put(':id/verify-btc')
  verifyBTC(@Param('id') id: string) {
    return this.usersService.verifyBTC(id);
  }

  @Get('/health')
  checkHealth() {
    return { status: 'ok' };
  }
}
