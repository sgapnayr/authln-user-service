import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const result = [
        { id: 1, username: 'ryan', email: 'ryan@example.com' },
        { id: 2, username: 'jane', email: 'jane@example.com' },
      ];
      expect(usersController.getAllUsers()).toEqual(result);
    });
  });

  describe('getUser', () => {
    it('should return a single user by ID', () => {
      const userId = '1';
      const result = { id: 1, username: 'ryan', email: 'ryan@example.com' };
      expect(usersController.getUser(userId)).toEqual(result);
    });

    it('should return null if user is not found', () => {
      const userId = '999';
      expect(usersController.getUser(userId)).toBeNull();
    });
  });
});
