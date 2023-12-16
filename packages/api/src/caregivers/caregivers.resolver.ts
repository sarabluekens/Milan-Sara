import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CaregiversService } from './caregivers.service'
import { Caregiver } from './entities/caregiver.entity'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'

@Resolver(() => Caregiver)
export class CaregiversResolver {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Query(() => [Caregiver], { name: 'caregivers' })
  findAll() {
    return this.caregiversService.findAll()
  }

  @Query(() => Caregiver, { name: 'caregiver', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.caregiversService.findOne(id)
  }

  @Mutation(() => Caregiver)
  createCaregiver(
    @Args('createCaregiverInput') createCaregiverInput: CreateCaregiverInput, // gebruikt de dto (met de defaultinput)
  ): Promise<Caregiver> {
    return this.caregiversService.create(createCaregiverInput)
  }

  @Mutation(() => Caregiver)
  updateCaregiverJobs(
    @Args('updateCaregiverInput') updateCaregiverInput: UpdateCaregiverInput,
  ) {
    return this.caregiversService.updateJobs(
      updateCaregiverInput.caregiverId,
      updateCaregiverInput,
    )
  }

  @Mutation(() => Caregiver)
  removeCaregiver(@Args('id', { type: () => Int }) id: number) {
    return this.caregiversService.remove(id)
  }
}
