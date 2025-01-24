import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'ryan', email: 'ryan@example.com' },
    { id: 2, username: 'jane', email: 'jane@example.com' },
  ];

  createUser(username: string, email: string) {
    const newUser = {
      id: this.users.length + 1,
      username,
      email,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAllUsers() {
    return this.users;
  }
}
