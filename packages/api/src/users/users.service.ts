import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { error } from 'console'

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return new error('This action adds a new user')
  }

  findAll() {
    return new error(`This action returns all users`)
  }

  findOne(id: String) {
    return new error(`This action returns a #${id} user`)
  }

  update(id: String, updateUserInput: UpdateUserInput) {
    return new error(`This action updates a #${id} user`)
  }

  remove(id: String) {
    return new error(`This action removes a #${id} user`)
  }
}
