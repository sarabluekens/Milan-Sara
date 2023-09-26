import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CaregiversService } from './caregivers.service'
import { Caregiver } from './entities/caregiver.entity'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'

@Resolver(() => Caregiver)
export class CaregiversResolver {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Mutation(() => Caregiver)
  createCaregiver(
    @Args('createCaregiverInput') createCaregiverInput: CreateCaregiverInput,
  ) {
    return this.caregiversService.create(createCaregiverInput)
  }

  @Query(() => [Caregiver], { name: 'caregivers' })
  findAll() {
    return [
      {
        id: '1',
        name: 'Water',
        fullname: 'En de rest komt later',
        category: 'Vloeibaar',
        description: 'Water water water',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    // return this.caregiversService.findAll()
  }

  @Query(() => Caregiver, { name: 'caregiver' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caregiversService.findOne(id)
  }

  @Mutation(() => Caregiver)
  updateCaregiver(
    @Args('updateCaregiverInput') updateCaregiverInput: UpdateCaregiverInput,
  ) {
    return this.caregiversService.update(
      updateCaregiverInput.id,
      updateCaregiverInput,
    )
  }

  @Mutation(() => Caregiver)
  removeCaregiver(@Args('id', { type: () => Int }) id: number) {
    return this.caregiversService.remove(id)
  }
}
