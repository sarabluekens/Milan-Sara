import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCaregiverInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
