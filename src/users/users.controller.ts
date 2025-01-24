import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return [
      { id: 1, username: 'ryan', email: 'ryan@example.com' },
      { id: 2, username: 'jane', email: 'jane@example.com' },
    ];
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return { id: Number(id), username: 'ryan', email: 'ryan@example.com' };
  }
}
