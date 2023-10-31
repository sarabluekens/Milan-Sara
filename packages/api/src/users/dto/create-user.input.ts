import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Optional locale of the current user.' })
  locale?: string

  @Field(() => String, { description: 'Name of the current user.' })
  name: string
}
