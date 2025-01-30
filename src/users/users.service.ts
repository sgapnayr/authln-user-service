import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 'user_1',
      username: 'ryan',
      email: 'ryan@example.com',
      password: 'hashedpassword1',
      btcAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwfue0m',
      isVerified: false,
      authorizedServices: ['Slack', 'Jira'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'user_2',
      username: 'jane',
      email: 'jane@example.com',
      password: 'hashedpassword2',
      btcAddress: null,
      isVerified: false,
      authorizedServices: ['GitHub'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private readonly logger = new Logger(UsersService.name);

  findAllUsers() {
    this.logger.log('Fetching all users...');
    return this.users;
  }

  findUserById(id: string) {
    this.logger.log(`Fetching user by ID: ${id}`);
    return this.users.find((user) => user.id === id);
  }

  createUser(username: string, email: string, password: string) {
    const newUser = {
      id: `user_${this.users.length + 1}`,
      username,
      email,
      password, // TODO: Hash this in production
      btcAddress: null,
      isVerified: false,
      authorizedServices: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    this.logger.log(`Created new user: ${JSON.stringify(newUser)}`);
    return newUser;
  }

  updateBTCAddress(userId: string, btcAddress: string) {
    this.logger.log(`Updating BTC address for user: ${userId}`);
    const user = this.findUserById(userId);
    if (user) {
      user.btcAddress = btcAddress;
      user.updatedAt = new Date();
      return user;
    }
    this.logger.warn(`User not found: ${userId}`);
    return null;
  }

  verifyBTC(userId: string) {
    this.logger.log(`Verifying BTC payment for user: ${userId}`);
    const user = this.findUserById(userId);
    if (user && user.btcAddress) {
      user.isVerified = true;
      user.updatedAt = new Date();
      return user;
    }
    this.logger.warn(`BTC verification failed for user: ${userId}`);
    return null;
  }
}
