import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { UserGroupListResult } from '../../graphql/schemas/user-group/list.result';
import { Inject, forwardRef } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { GroupEntity } from '../../database/entities/group.entity';
import { GroupResolver } from '../group/group.resolver';
import { UserEntity } from '../../database/entities/user.entity';
import { UserResolver } from '../user/user.resolver';

@Resolver(UserGroupEntity)
export class UserGroupResolver {

  @Inject(UserGroupService)
  private userGroupService: UserGroupService;

  @Inject(forwardRef(() => GroupResolver))
  private groupResolver: GroupResolver;

  @Inject(forwardRef(() => UserResolver))
  private userResolver: UserResolver;

  listByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<UserGroupListResult> {
    return this.userGroupService.listByUserId(userId, page, pageSize);
  }

  @ResolveField(() => GroupEntity)
  group(@Parent() parent: UserGroupEntity): Promise<GroupEntity> {
    return this.groupResolver.groupById(parent.groupId);
  }

  @ResolveField(() => UserEntity)
  user(@Parent() parent: UserGroupEntity): Promise<UserEntity> {
    return this.userResolver.getById(parent.userId);
  }

  getById(id: number): Promise<UserGroupEntity> {
    return this.userGroupService.getById(id);
  }
}
