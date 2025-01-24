import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private readonly users = [
    { id: 1, username: 'ryan', email: 'ryan@example.com' },
    { id: 2, username: 'jane', email: 'jane@example.com' },
  ];

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.users.find((user) => user.id === userId) || null;
  }
}
