import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { error } from 'console'
import { InjectRepository } from '@nestjs/typeorm'
import { Role, User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(uid: string, CreateUserInput: CreateUserInput) {
    const user = new User()
    user.uid = uid
    user.name = CreateUserInput.name
    user.email = CreateUserInput.email
    user.locale = CreateUserInput.locale ?? 'nl'
    user.role = Role.COMPANY // BUG: default columns doesn't seem to work
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return new error(`This action returns a #${id} user`)
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return new error(`This action updates a #${id} user`)
  }

  remove(id: string) {
    return new error(`This action removes a #${id} user`)
  }

  // logic for seeding
  saveAll(userSeeding: User[]): Promise<User[]> {
    return this.userRepository.save(userSeeding)
  }

  truncate(): Promise<void> {
    return this.userRepository.clear()
  }
}
