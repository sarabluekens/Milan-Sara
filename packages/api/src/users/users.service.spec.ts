import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UsersService', () => {
  let service: UsersService
  let mockUsersRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    mockUsersRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
