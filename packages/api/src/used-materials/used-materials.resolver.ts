import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsedMaterialsService } from './used-materials.service';
import { UsedMaterial } from './entities/used-material.entity';
import { CreateUsedMaterialInput } from './dto/create-used-material.input';
import { UpdateUsedMaterialInput } from './dto/update-used-material.input';

@Resolver(() => UsedMaterial)
export class UsedMaterialsResolver {
  constructor(private readonly usedMaterialsService: UsedMaterialsService) {}

  @Mutation(() => UsedMaterial)
  createUsedMaterial(@Args('createUsedMaterialInput') createUsedMaterialInput: CreateUsedMaterialInput) {
    return this.usedMaterialsService.create(createUsedMaterialInput);
  }

  @Query(() => [UsedMaterial], { name: 'usedMaterials' })
  findAll() {
    return this.usedMaterialsService.findAll();
  }

  @Query(() => UsedMaterial, { name: 'usedMaterial' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usedMaterialsService.findOne(id);
  }

  @Mutation(() => UsedMaterial)
  updateUsedMaterial(@Args('updateUsedMaterialInput') updateUsedMaterialInput: UpdateUsedMaterialInput) {
    return this.usedMaterialsService.update(updateUsedMaterialInput.id, updateUsedMaterialInput);
  }

  @Mutation(() => UsedMaterial)
  removeUsedMaterial(@Args('id', { type: () => Int }) id: number) {
    return this.usedMaterialsService.remove(id);
  }
}
