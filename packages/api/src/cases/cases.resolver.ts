import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
} from '@nestjs/graphql'
import { CasesService } from './cases.service'
import { Case } from './entities/case.entity'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'
import { log } from 'console'
@Resolver(() => Case) // tells nestjs to resolve for the table Case
export class CasesResolver {
  // autmatically create instance of casesService and inject in resolver
  constructor(private readonly casesService: CasesService) {}

  // TODO is this in use?
  // schrijf je wat iets teruggeeft, hier geeft het cases terugs
  // @Query(() => Case, { name: 'getOneCase' })
  // getCase(@Args('date', { type: () => Date }) data: Date) {
  //   return this.casesService.findOneByDate(data)
  // }

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

  // TODO is this in use?
  // @Query(() => Case, { name: 'case' })
  // findOneByDate(@Args('date', { type: () => Date }) date: Date) {
  //   return this.casesService.findOneByDate(date)
  // }

  @Query(() => Case, { name: 'caseById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.casesService.getCaseById(id)
  }

  @Query(() => [Case], { name: 'cases' })
  findAll() {
    return this.casesService.findAll()
  }

  @Mutation(() => Case)
  addVictimToCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.updateVictimId(
      updateCaseInput.caseId,
      updateCaseInput.victimId,
    )
  }

  // add victimCoordinates to the Case
  @Mutation(() => Case)
  addVictimCo(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.updateVictimCo(
      updateCaseInput.caseId,
      updateCaseInput.victimCoordinates,
    )
  }

  // add caregiverCoordinates to the Case
  @Mutation(() => Case)
  addCaregiverCo(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.updateCaregiverCo(
      updateCaseInput.caseId,
      updateCaseInput.caregiverCoordinates,
    )
  }

  // @Mutation(() => Case)
  // updateCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
  //   return this.casesService.update(updateCaseInput.id, updateCaseInput)
  // }

  @Mutation(() => Case)
  removeCase(@Args('id', { type: () => Int }) id: number) {
    return this.casesService.remove(id)
  }
}
