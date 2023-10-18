import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VictimsService } from './victims.service';
import { Victim } from './entities/victim.entity';
import { CreateVictimInput } from './dto/create-victim.input';
import { UpdateVictimInput } from './dto/update-victim.input';

@Resolver(() => Victim)
export class VictimsResolver {
  constructor(private readonly victimsService: VictimsService) {}

  @Mutation(() => Victim)
  createVictim(@Args('createVictimInput') createVictimInput: CreateVictimInput) {
    return this.victimsService.create(createVictimInput);
  }

  @Query(() => [Victim], { name: 'victims' })
  findAll() {
    return this.victimsService.findAll();
  }

  @Query(() => Victim, { name: 'victim' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.victimsService.findOne(id);
  }

  @Mutation(() => Victim)
  updateVictim(@Args('updateVictimInput') updateVictimInput: UpdateVictimInput) {
    return this.victimsService.update(updateVictimInput.id, updateVictimInput);
  }

  @Mutation(() => Victim)
  removeVictim(@Args('id', { type: () => Int }) id: number) {
    return this.victimsService.remove(id);
  }
}
