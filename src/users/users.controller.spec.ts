import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const mockUsersService = {
      findAllUsers: jest.fn().mockReturnValue([
        { id: 1, username: 'ryan', email: 'ryan@example.com' },
        { id: 2, username: 'jane', email: 'jane@example.com' },
      ]),
      createUser: jest.fn(
        (username: string, email: string, password: string) => ({
          id: 3,
          username,
          email,
          password,
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('createUser', () => {
    it('should create and return a new user', () => {
      const username = 'mike';
      const email = 'mike@example.com';
      const password = 'password';

      const result = {
        id: 3,
        username,
        email,
        password,
      };

      expect(usersController.createUser(username, email, password)).toEqual(
        result,
      );
    });
  });
});
