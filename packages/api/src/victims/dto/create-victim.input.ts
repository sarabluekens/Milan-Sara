import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVictimInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
