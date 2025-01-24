/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Mock the UserRepository
          useClass: Repository, // Use TypeORM's Repository as a base mock
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      id: 1,
      username: 'ryan',
      email: 'ryan@example.com',
      password: 'password',
    };

    // Mock the repository's create and save methods
    jest
      .spyOn(userRepository, 'create')
      .mockReturnValue(user as unknown as User);
    jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user as unknown as User);

    const result = await service.createUser(
      user.username,
      user.email,
      user.password,
    );
    expect(result).toEqual(user);
    expect(userRepository.create).toHaveBeenCalledWith({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users = [
      {
        id: 1,
        username: 'ryan',
        email: 'ryan@example.com',
        password: 'password',
      },
      {
        id: 2,
        username: 'jane',
        email: 'jane@example.com',
        password: 'password',
      },
    ];

    // Mock the repository's find method
    jest
      .spyOn(userRepository, 'find')
      .mockResolvedValue(users as unknown as User[]);

    const result = await service.findAllUsers();
    expect(result).toEqual(users);
    expect(userRepository.find).toHaveBeenCalled();
  });
});
