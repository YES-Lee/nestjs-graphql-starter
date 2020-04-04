import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { UserGroupListResult } from '../../graphql/schemas/user-group/list.result';
import { Inject } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { GroupEntity } from '../../database/entities/group.entity';
import { GroupResolver } from '../group/group.resolver';
import { Int } from 'type-graphql';

@Resolver(UserGroupEntity)
export class UserGroupResolver {

  @Inject(UserGroupService)
  private userGroupService: UserGroupService;

  @Inject(GroupResolver)
  private groupResolver: GroupResolver;

  @Query(() => UserGroupListResult)
  listByUserId(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number
  ): Promise<UserGroupListResult> {
    return this.userGroupService.listByUserId(userId, page, pageSize);
  }

  @ResolveProperty(() => GroupEntity)
  group(@Parent() parent: UserGroupEntity): Promise<GroupEntity> {
    return this.groupResolver.groupById(parent.groupId);
  }
}
