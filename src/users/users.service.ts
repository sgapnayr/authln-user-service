import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, username: 'ryan', email: 'ryan@example.com' },
    { id: 2, username: 'jane', email: 'jane@example.com' },
  ];

  createUser(username: string, email: string, password: string) {
    const newUser = { id: this.users.length + 1, username, email, password };
    this.users.push(newUser);
    return newUser;
  }

  findAllUsers() {
    return this.users;
  }
}
