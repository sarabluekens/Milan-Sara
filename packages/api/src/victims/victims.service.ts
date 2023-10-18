import { Injectable } from '@nestjs/common';
import { CreateVictimInput } from './dto/create-victim.input';
import { UpdateVictimInput } from './dto/update-victim.input';

@Injectable()
export class VictimsService {
  create(createVictimInput: CreateVictimInput) {
    return 'This action adds a new victim';
  }

  findAll() {
    return `This action returns all victims`;
  }

  findOne(id: number) {
    return `This action returns a #${id} victim`;
  }

  update(id: number, updateVictimInput: UpdateVictimInput) {
    return `This action updates a #${id} victim`;
  }

  remove(id: number) {
    return `This action removes a #${id} victim`;
  }
}
