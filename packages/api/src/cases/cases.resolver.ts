import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CasesService } from './cases.service';
import { Case } from './entities/case.entity';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';

@Resolver(() => Case)
export class CasesResolver {
  constructor(private readonly casesService: CasesService) {}

  @Mutation(() => Case)
  createCase(@Args('createCaseInput') createCaseInput: CreateCaseInput) {
    return this.casesService.create(createCaseInput);
  }

  @Query(() => [Case], { name: 'cases' })
  findAll() {
    return this.casesService.findAll();
  }

  @Query(() => Case, { name: 'case' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.casesService.findOne(id);
  }

  @Mutation(() => Case)
  updateCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.update(updateCaseInput.id, updateCaseInput);
  }

  @Mutation(() => Case)
  removeCase(@Args('id', { type: () => Int }) id: number) {
    return this.casesService.remove(id);
  }
}
