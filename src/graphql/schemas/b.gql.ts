import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class B {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
}
