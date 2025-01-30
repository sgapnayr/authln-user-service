import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAllUsers: jest.fn().mockReturnValue([
        {
          id: 'user_1',
          username: 'ryan',
          email: 'ryan@example.com',
          btcAddress: 'bc1qar0...',
          isVerified: false,
          authorizedServices: ['Slack', 'Jira'],
        },
        {
          id: 'user_2',
          username: 'jane',
          email: 'jane@example.com',
          btcAddress: null,
          isVerified: false,
          authorizedServices: ['GitHub'],
        },
      ]),
      findUserById: jest.fn((id: string) => ({
        id,
        username: 'mike',
        email: 'mike@example.com',
        btcAddress: null,
        isVerified: false,
        authorizedServices: [],
      })),
      createUser: jest.fn(
        (username: string, email: string, password: string) => ({
          id: 'user_3',
          username,
          email,
          password,
          btcAddress: null,
          isVerified: false,
          authorizedServices: [],
        }),
      ),
      updateBTCAddress: jest.fn((id: string, btcAddress: string) => ({
        id,
        btcAddress,
        isVerified: false,
      })),
      verifyBTC: jest.fn((id: string) => ({
        id,
        isVerified: true,
      })),
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
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      expect(usersController.getAllUsers()).toEqual(
        usersService.findAllUsers(),
      );
    });
  });

  describe('getUserById', () => {
    it('should return a single user', () => {
      const userId = 'user_3';
      expect(usersController.getUserById(userId)).toEqual(
        usersService.findUserById(userId),
      );
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', () => {
      const username = 'mike';
      const email = 'mike@example.com';
      const password = 'password';

      expect(usersController.createUser(username, email, password)).toEqual(
        usersService.createUser(username, email, password),
      );
    });
  });

  describe('updateBTCAddress', () => {
    it('should update the user BTC address', () => {
      const userId = 'user_3';
      const btcAddress = 'bc1qar0...';
      expect(usersController.updateBTCAddress(userId, btcAddress)).toEqual(
        usersService.updateBTCAddress(userId, btcAddress),
      );
    });
  });

  describe('verifyBTC', () => {
    it('should mark user as BTC verified', () => {
      const userId = 'user_3';
      expect(usersController.verifyBTC(userId)).toEqual(
        usersService.verifyBTC(userId),
      );
    });
  });

  describe('checkHealth', () => {
    it('should return service health status', () => {
      expect(usersController.checkHealth()).toEqual({ status: 'ok' });
    });
  });
});
