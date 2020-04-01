import { Resolver, ResolveProperty, Parent, Query, Args } from '@nestjs/graphql';
import { AB } from '../../graphql/schemas/a-b.gql';
import { A } from '../../graphql/schemas/a.gql';
import { B } from '../../graphql/schemas/b.gql';

import data from '../../graphql/mock';
import { Inject, forwardRef } from '@nestjs/common';
import { AResolver } from '../a/a.resolver';
import { BResolver } from './b.resolver';

@Resolver(AB)
export class AbResolver {
  @Inject(forwardRef(() => AResolver))
  private aResolver: AResolver;
  @Inject(forwardRef(() => BResolver))
  private bResover: BResolver;

  @Query(() => [AB])
  abList() {
    return data.ab;
  }

  @Query(() => [AB])
  abListByAId(@Args('a_id') id: number) {
    return data.ab.filter(item => item.a_id === id);
  }

  @Query(() => [AB])
  abListByBId(@Args('b_id') id: number) {
    return data.ab.filter(item => item.b_id === id);
  }

  @ResolveProperty(() => A)
  a(@Parent() ab: AB): A {
    return this.aResolver.aById(ab.a_id);
  }
  @ResolveProperty(() => B)
  b(@Parent() ab: AB): B {
    return this.bResover.bById(ab.b_id);
  }
}
