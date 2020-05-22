import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { GroupEntity } from '../../database/entities/group.entity';
import { Inject, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { Int } from '@nestjs/graphql';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { UserGroupResolver } from '../user-group/user-group.resolver';
import { GroupListArgs } from '../../graphql/schemas/group/list.args';
import { UserGroupListResult } from '../../graphql/schemas/user-group/list.result';

@Resolver(GroupEntity)
export class GroupResolver {
  @Inject(GroupService)
  private groupService: GroupService;

  @Inject(forwardRef(() => UserGroupResolver))
  private userGroupResolver: UserGroupResolver;

  @Query(() => GroupEntity)
  groupById(@Args({ name: 'id', type: () => Int }) id: number): Promise<GroupEntity> {
    return this.groupService.getById(id);
  }

  listByUserId( userId: number, groupListArgs: GroupListArgs): Promise<GroupListResult> {
    return this.groupService.listByUserId(userId, groupListArgs);
  }

  @ResolveField(() => UserGroupListResult)
  userGroups(
    @Parent() group: GroupEntity,
    @Args({ name: 'page', type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args({ name: 'pageSize', type: () => Int, nullable: true, defaultValue: 10 }) pageSize: number,
    @Args({ name: 'userId', type: () => Int, nullable: true }) userId: number
  ): Promise<UserGroupListResult> {
    return this.userGroupResolver.listByGroupId(group.id, page, pageSize, userId);
  }
}
