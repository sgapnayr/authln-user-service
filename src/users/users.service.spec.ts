import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user with BTC disabled by default', () => {
      const username = 'mike';
      const email = 'mike@example.com';
      const password = 'password';

      const newUser = service.createUser(username, email, password);
      expect(newUser).toHaveProperty('id');
      expect(newUser.btcAddress).toBeNull();
      expect(newUser.isVerified).toBe(false);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', () => {
      const users = service.findAllUsers();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', () => {
      const userId = 'user_1';
      const user = service.findUserById(userId);
      expect(user).toHaveProperty('id', userId);
    });

    it('should return undefined if user does not exist', () => {
      expect(service.findUserById('non_existent')).toBeUndefined();
    });
  });

  describe('updateBTCAddress', () => {
    it('should update BTC address for an existing user', () => {
      const userId = 'user_1';
      const btcAddress = 'bc1qar0...';
      const updatedUser = service.updateBTCAddress(userId, btcAddress);
      expect(updatedUser?.btcAddress).toEqual(btcAddress);
    });

    it('should return null if user does not exist', () => {
      expect(service.updateBTCAddress('non_existent', 'bc1qar0...')).toBeNull();
    });
  });

  describe('verifyBTC', () => {
    it('should mark a user as BTC verified', () => {
      const userId = 'user_1';
      const verifiedUser = service.verifyBTC(userId);
      expect(verifiedUser?.isVerified).toBe(true);
    });

    it('should return null if user does not exist', () => {
      expect(service.verifyBTC('non_existent')).toBeNull();
    });
  });
});
