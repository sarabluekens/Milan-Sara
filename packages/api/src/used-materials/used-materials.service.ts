import { Injectable } from '@nestjs/common';
import { CreateUsedMaterialInput } from './dto/create-used-material.input';
import { UpdateUsedMaterialInput } from './dto/update-used-material.input';

@Injectable()
export class UsedMaterialsService {
  create(createUsedMaterialInput: CreateUsedMaterialInput) {
    return 'This action adds a new usedMaterial';
  }

  findAll() {
    return `This action returns all usedMaterials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usedMaterial`;
  }

  update(id: number, updateUsedMaterialInput: UpdateUsedMaterialInput) {
    return `This action updates a #${id} usedMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} usedMaterial`;
  }
}
