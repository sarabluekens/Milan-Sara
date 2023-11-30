import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { VictimsService } from './victims.service'
import { Victim } from './entities/victim.entity'
import { CreateVictimInput } from './dto/create-victim.input'
import { UpdateVictimInput } from './dto/update-victim.input'

@Resolver(() => Victim)
export class VictimsResolver {
  constructor(private readonly victimsService: VictimsService) {}

  @Query(() => [Victim], { name: 'getVictims' })
  findAll() {
    return this.victimsService.findAll()
  }

  @Query(() => Victim, { name: 'getOneVictim' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.victimsService.findOne(id)
  }

  @Query(() => Victim, { name: 'getVictimByName', nullable: true })
  findOneByFullName(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    return this.victimsService.findOneByFullName(
      firstName.toLowerCase(),
      lastName.toLowerCase(),
    )
  }

  @Mutation(() => Victim, {
    description: 'Create a Victim using the DTO.',
  })
  createVictim(
    @Args('createVictimInput') createVictimInput: CreateVictimInput,
  ) {
    return this.victimsService.create(createVictimInput)
  }

  @Mutation(() => Victim)
  addCasetoVictim(
    @Args('updateVictimInput') updateVictimInput: UpdateVictimInput,
  ) {
    return this.victimsService.update(
      updateVictimInput.victimId,
      updateVictimInput.caseId,
    )
  }

  @Mutation(() => Victim)
  removeVictim(@Args('id', { type: () => Int }) id: number) {
    return this.victimsService.remove(id)
  }
}
