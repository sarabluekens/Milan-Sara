import { Injectable } from '@nestjs/common';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';

@Injectable()
export class CasesService {
  create(createCaseInput: CreateCaseInput) {
    return 'This action adds a new case';
  }

  findAll() {
    return `This action returns all cases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number, updateCaseInput: UpdateCaseInput) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
