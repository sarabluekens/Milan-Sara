import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CasesService } from './cases.service'
import { Case } from './entities/case.entity'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'
import { log } from 'console'
@Resolver(() => Case) // tells nestjs to resolve for the table Case
export class CasesResolver {
  // autmatically create instance of casesService and inject in resolver
  constructor(private readonly casesService: CasesService) {}

  // schrijf je wat iets teruggeeft, hier geeft het cases terugs
  @Query(() => Case, { name: 'getOneCase' })
  getCase(@Args('data', { type: () => Date }) data: Date) {
    return this.casesService.findOneByDate(data)
  }

  @Query(() => [Case]) // tells graphql that this is a query
  cases(): Promise<Case[]> {
    return this.casesService.findAll()
  }

  @Mutation(() => Case)
  createCase(
    @Args('createCaseInput') createCaseInput: CreateCaseInput,
  ): Promise<Case> {
    return this.casesService.create(createCaseInput)
  }

  @Query(() => Case, { name: 'case' })
  findOneByDate(@Args('date', { type: () => Date }) date: Date) {
    return this.casesService.findOneByDate(date)
  }

  @Query(() => [Case], { name: 'cases' })
  findAll() {
    return this.casesService.findAll()
  }

  @Mutation(() => Case)
  updateCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.update(updateCaseInput.id, updateCaseInput)
  }

  @Mutation(() => Case)
  removeCase(@Args('id', { type: () => Int }) id: number) {
    return this.casesService.remove(id)
  }
}
