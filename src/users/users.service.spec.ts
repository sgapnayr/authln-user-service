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

  it('should create a user', () => {
    const username = 'ryan';
    const email = 'ryan@example.com';

    const result = service.createUser(username, email);

    expect(result).toEqual({
      id: 3, // Reflects the new ID logic
      username,
      email,
    });
  });

  it('should find all users', () => {
    const users = service.findAllUsers();

    expect(users).toEqual([
      { id: 1, username: 'ryan', email: 'ryan@example.com' },
      { id: 2, username: 'jane', email: 'jane@example.com' },
    ]);
  });
});
