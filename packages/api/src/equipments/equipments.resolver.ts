import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { EquipmentsService } from './equipments.service'
import { Equipment } from './entities/equipment.entity'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { UpdateEquipmentInput } from './dto/update-equipment.input'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { FirebaseUser } from 'src/authentication/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'

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
  findAll(@FirebaseUser() currentUser: UserRecord) {
    console.log(currentUser)
    // findAll() {
    return this.equipmentsService.findAll()
  }

  // schrijf je wat iets teruggeeft, hier geeft het equipment terugs
  @Query(() => Equipment, { name: 'equipment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.equipmentsService.findOne(id)
  }

  // mutation is een soort van post request
  // mutation geeft niet altijd iets terug, hier wel (object Equipment, kan ook bool of string...)
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
