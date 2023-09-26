import { Injectable } from '@nestjs/common';
import { CreateCaregiverInput } from './dto/create-caregiver.input';
import { UpdateCaregiverInput } from './dto/update-caregiver.input';

@Injectable()
export class CaregiversService {
  create(createCaregiverInput: CreateCaregiverInput) {
    return 'This action adds a new caregiver';
  }

  findAll() {
    return `This action returns all caregivers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caregiver`;
  }

  update(id: number, updateCaregiverInput: UpdateCaregiverInput) {
    return `This action updates a #${id} caregiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} caregiver`;
  }
}
