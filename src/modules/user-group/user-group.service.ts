import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { USER_GROUP_REPO } from './user-group.providers';
import { UserGroupListResult } from '../../graphql/schemas/user-group/list.result';

@Injectable()
export class UserGroupService {

  @Inject(USER_GROUP_REPO)
  groupRepo: Repository<UserGroupEntity>;

  async listByUserId(userId: number, page = 1, pageSize = 10, groupId?: number): Promise<UserGroupListResult> {
    const queryBuilder = this.groupRepo
      .createQueryBuilder('userGroup')
      .where('userGroup.user_id = :userId', { userId })
      .limit(pageSize)
      .offset(pageSize * (page - 1));
    if (groupId) {
      queryBuilder.andWhere('userGroup.group_id = :groupId', { groupId })
    }
    const [rows, count] = await queryBuilder.getManyAndCount()
    return {
      count,
      rows
    };
  }

  async listByGroupId(groupId: number, page: number, pageSize: number, userId?: number): Promise<UserGroupListResult> {
    const queryBuilder = this.groupRepo.createQueryBuilder('UserGroup')
      .where('UserGroup.group_id = :groupId', { groupId })
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    if (userId) {
      queryBuilder.andWhere('UserGroup.user_id = :userId', { userId })
    }
    const [rows, count] = await queryBuilder.getManyAndCount()
    return {
      rows,
      count
    }
  }

}
