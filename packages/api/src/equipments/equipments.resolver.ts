import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { EquipmentsService } from './equipments.service'
import { Equipment } from './entities/equipment.entity'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { UpdateEquipmentInput } from './dto/update-equipment.input'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { FirebaseUser } from 'src/authentication/decorators/user.decorator'

@Resolver(() => Equipment)
export class EquipmentsResolver {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Mutation(() => Equipment, {
    description: 'Create an equipment using the DTO.',
  })
  createEquipment(
    @Args('createEquipmentInput') createEquipmentInput: CreateEquipmentInput,
  ): Promise<Equipment> {
    return this.equipmentsService.create(createEquipmentInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Equipment], { name: 'equipments' })
  findAll(@FirebaseUser() user: any) {
    /*    return [
      {
        id: '1',
        name: 'Tang',
        fullname: 'Tang der Tangen',
        category: 'BreekTang',
        description: 'test',
        amount: 1,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] */
    return this.equipmentsService.findAll()
  }

  @Query(() => Equipment, { name: 'equipment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.equipmentsService.findOne(id)
  }

  @Mutation(() => Equipment)
  updateEquipment(
    @Args('updateEquipmentInput') updateEquipmentInput: UpdateEquipmentInput,
  ) {
    return this.equipmentsService.update(
      updateEquipmentInput.id,
      updateEquipmentInput,
    )
  }

  @Mutation(() => Equipment)
  removeEquipment(@Args('id', { type: () => Int }) id: number) {
    return this.equipmentsService.remove(id)
  }
}
