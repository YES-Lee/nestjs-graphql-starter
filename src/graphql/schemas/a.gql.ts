import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class A {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
}
